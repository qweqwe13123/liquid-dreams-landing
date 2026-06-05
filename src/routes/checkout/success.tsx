import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { useGlobalVideoUnlock } from "@/hooks/use-global-video-unlock";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Checkout success — Solver" },
      { name: "description", content: "Your Solver checkout is complete." },
    ],
  }),
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  useGlobalVideoUnlock();

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 sm:py-14"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #faf6f0 0%, #efe6d8 45%, #e8dece 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <SiteHeader variant="light" showDesktopCta={false} />

      <div className="mx-auto mt-10 max-w-3xl rounded-[24px] border border-[#e8e2d9] bg-white/95 p-6 shadow-[0_24px_80px_-36px_rgba(61,56,50,0.22)] sm:p-10">
        <div className="flex items-center gap-3 text-sm text-[#8a8178]">
          <BadgeCheck className="h-4 w-4 text-[#2c2824]" />
          Payment complete
        </div>
        <h1 className="mt-3 text-3xl font-medium leading-tight text-[#2c2824]">
          You&apos;re in. Your subscription is being synced now.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6f665c]">
          Stripe has processed the checkout. We&apos;ll send a thank-you email to the address you
          entered, and the webhook will update your subscription record automatically.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/account/billing"
            className="inline-flex items-center gap-2 rounded-full bg-[#2c2824] px-6 py-3 text-sm text-white transition-colors hover:bg-[#1f1b17]"
          >
            Go to billing
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/subscriptions"
            className="inline-flex items-center gap-2 rounded-full border border-[#e0d9cf] px-6 py-3 text-sm text-[#2c2824]"
          >
            View plans
          </Link>
        </div>
      </div>
    </div>
  );
}
