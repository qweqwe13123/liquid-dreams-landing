import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useGlobalVideoUnlock } from "@/hooks/use-global-video-unlock";

const PLAN_IDS = ["starter", "pro", "ultra"] as const;

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: PLAN_IDS.includes(search.plan as (typeof PLAN_IDS)[number])
      ? (search.plan as (typeof PLAN_IDS)[number])
      : "starter",
    period: search.period === "annually" ? "annually" : "monthly",
  }),
  component: CheckoutRedirectPage,
});

function CheckoutRedirectPage() {
  useGlobalVideoUnlock();
  const { plan, period } = Route.useSearch();

  useEffect(() => {
    window.location.replace(`/api/stripe/checkout?plan=${plan}&period=${period}`);
  }, [period, plan]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6efe5] px-6 text-center">
      <p className="text-sm text-[#7a7066]">Redirecting to Stripe checkout...</p>
    </div>
  );
}
