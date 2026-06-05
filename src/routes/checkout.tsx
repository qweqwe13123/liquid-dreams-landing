import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { ArrowLeft, BadgeCheck, CreditCard, LoaderCircle } from "lucide-react";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { createCheckoutSession, getStripePublishableKeyFn } from "@/lib/api/billing.functions";
import { PLANS, type BillingPeriod, type PlanId, displayPrice } from "@/lib/stripe-config";
import { useGlobalVideoUnlock } from "@/hooks/use-global-video-unlock";

type Selection = {
  plan: PlanId;
  period: BillingPeriod;
};

const PLAN_IDS: PlanId[] = ["starter", "pro", "ultra"];

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: PLAN_IDS.includes(search.plan as PlanId) ? (search.plan as PlanId) : "starter",
    period: search.period === "annually" ? "annually" : "monthly",
  }),
  head: () => ({
    meta: [
      { title: "Checkout — Solver" },
      { name: "description", content: "Complete your Solver subscription checkout." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  useGlobalVideoUnlock();
  const routeSearch = Route.useSearch();
  const routeSelection = useMemo(
    () => ({ plan: routeSearch.plan, period: routeSearch.period }),
    [routeSearch.plan, routeSearch.period],
  );
  const [selection, setSelection] = useState<Selection>(() => routeSearch);
  const [sessionState, setSessionState] = useState<
    | { status: "checking" }
    | { status: "needs-auth" }
    | { status: "loading" }
    | { status: "ready"; clientSecret: string; stripePromise: Promise<Stripe | null> }
    | { status: "error"; message: string }
  >({ status: "checking" });

  useEffect(() => {
    setSelection(routeSelection);
  }, [routeSelection]);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;

      if (!data.session) {
        setSessionState({ status: "needs-auth" });
        return;
      }

      setSessionState({ status: "loading" });

      try {
        const [{ publishableKey }, { clientSecret }] = await Promise.all([
          getStripePublishableKeyFn(),
          createCheckoutSession({ data: selection }),
        ]);
        if (!active) return;

        const stripePromise = loadStripe(publishableKey);
        setSessionState({ status: "ready", clientSecret, stripePromise });
      } catch (error) {
        if (!active) return;
        setSessionState({
          status: "error",
          message: error instanceof Error ? error.message : "Unable to start checkout.",
        });
      }
    });

    return () => {
      active = false;
    };
  }, [selection]);

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 sm:py-14"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #faf6f0 0%, #efe6d8 45%, #e8dece 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <SiteHeader
        variant="light"
        showDesktopCta={false}
        backLink={
          <Link
            to="/subscriptions"
            className="inline-flex items-center gap-2 text-sm text-[#8a8178] hover:text-[#2c2824]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to plans
          </Link>
        }
      />

      <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-[24px] border border-[#e8e2d9] bg-white/90 p-6 shadow-[0_24px_80px_-36px_rgba(61,56,50,0.22)] sm:p-8">
          <p className="text-sm text-[#a39a90]">Checkout</p>
          <h1 className="mt-2 text-3xl font-medium leading-tight text-[#2c2824]">
            Finish your subscription in a secure Stripe checkout.
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            {PLAN_IDS.map((planId) => {
              const plan = PLANS[planId];
              const active = selection.plan === planId;
              return (
                <button
                  key={planId}
                  type="button"
                  onClick={() => setSelection((prev) => ({ ...prev, plan: planId }))}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-[#2c2824] bg-[#2c2824] text-white"
                      : "border-[#e0d9cf] bg-white text-[#4a4540] hover:border-[#c4b8a8]"
                  }`}
                >
                  {plan.name}
                </button>
              );
            })}
          </div>

          <div className="mt-5 inline-flex rounded-full border border-[#e0d9cf] bg-[#faf8f5] p-1">
            <button
              type="button"
              onClick={() => setSelection((prev) => ({ ...prev, period: "monthly" }))}
              className={`rounded-full px-4 py-2 text-sm ${
                selection.period === "monthly"
                  ? "bg-white text-[#2c2824] shadow-sm"
                  : "text-[#8a8178]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setSelection((prev) => ({ ...prev, period: "annually" }))}
              className={`rounded-full px-4 py-2 text-sm ${
                selection.period === "annually"
                  ? "bg-white text-[#2c2824] shadow-sm"
                  : "text-[#8a8178]"
              }`}
            >
              Annually
            </button>
          </div>

          <div className="mt-8 border-t border-[#ece7e0] pt-6">
            <p className="text-sm text-[#a39a90]">Selected plan</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-tight text-[#2c2824]">
                ${displayPrice(PLANS[selection.plan].monthlyPrice, selection.period)}
              </span>
              <span className="mb-1.5 text-sm text-[#8a8178]">
                / {selection.period === "annually" ? "year" : "month"}
              </span>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#6f665c]">
              {PLANS[selection.plan].features[0]}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-[#6f665c]">
            <CreditCard className="h-4 w-4 text-[#2c2824]" />
            Stripe Embedded Checkout
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-[#6f665c]">
            <BadgeCheck className="h-4 w-4 text-[#2c2824]" />
            Your subscription will be synced to Supabase after payment.
          </div>
        </section>

        <section className="rounded-[24px] border border-[#e8e2d9] bg-white/95 p-4 shadow-[0_24px_80px_-36px_rgba(61,56,50,0.22)] sm:p-6">
          {sessionState.status === "checking" || sessionState.status === "loading" ? (
            <div className="flex min-h-[540px] items-center justify-center text-[#8a8178]">
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              Loading secure checkout...
            </div>
          ) : null}

          {sessionState.status === "needs-auth" ? (
            <div className="flex min-h-[540px] flex-col items-center justify-center gap-4 text-center">
              <p className="text-sm text-[#8a8178]">You need to sign in before checkout.</p>
              <Link
                to="/auth"
                search={{ redirect: `/checkout?plan=${selection.plan}&period=${selection.period}` }}
                className="rounded-full bg-[#2c2824] px-6 py-3 text-sm text-white transition-colors hover:bg-[#1f1b17]"
              >
                Sign in with a magic link
              </Link>
            </div>
          ) : null}

          {sessionState.status === "error" ? (
            <div className="flex min-h-[540px] flex-col items-center justify-center gap-4 text-center">
              <p className="max-w-md text-sm text-red-600">{sessionState.message}</p>
              <button
                type="button"
                onClick={() => setSelection((prev) => ({ ...prev }))}
                className="rounded-full border border-[#e0d9cf] px-6 py-3 text-sm text-[#2c2824]"
              >
                Try again
              </button>
            </div>
          ) : null}

          {sessionState.status === "ready" ? (
            <EmbeddedCheckoutProvider
              stripe={sessionState.stripePromise}
              options={{ clientSecret: sessionState.clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : null}
        </section>
      </div>
    </div>
  );
}
