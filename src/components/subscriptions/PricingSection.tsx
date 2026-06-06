import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

type Billing = "monthly" | "annually";

type Plan = {
  id: string;
  name: string;
  monthlyPrice: number;
  recommended?: boolean;
  features: readonly string[];
};

const PLANS: readonly Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    features: [
      "Monthly strategy check-in",
      "Email support (48h response)",
      "Small updates & bug fixes",
      "1 active request at a time",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 200,
    recommended: true,
    features: [
      "Everything in Starter",
      "Priority support & faster turnaround",
      "Weekly sync call",
      "3 active requests at a time",
      "Landing page & funnel tweaks",
    ],
  },
  {
    id: "ultra",
    name: "Ultra",
    monthlyPrice: 400,
    features: [
      "Everything in Pro",
      "Dedicated Solver team lead",
      "Same-day response window",
      "Unlimited active requests",
      "Custom automation & integrations",
    ],
  },
] as const;

function displayPrice(monthlyPrice: number, billing: Billing) {
  if (billing === "monthly") return monthlyPrice;
  return Math.round(monthlyPrice * 0.8);
}

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="bg-[#050505] px-4 py-16 text-white sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            className="flex flex-wrap items-center justify-center gap-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Find the right
            <Sparkles className="h-7 w-7 text-[#a3a3a3] sm:h-8 sm:w-8" aria-hidden />
            plan for you.
          </h1>
          <p className="mt-4 text-base text-[#a1a1aa] sm:text-lg">
            Choose a plan that fits your needs and start building today.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                billing === "monthly" ? "bg-white text-[#111]" : "text-[#a1a1aa]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annually")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                billing === "annually" ? "bg-white text-[#111]" : "text-[#a1a1aa]"
              }`}
            >
              Annually
              <span className="rounded-full bg-[#d1fae5] px-2 py-0.5 text-[11px] font-semibold text-[#065f46]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:gap-6">
          {PLANS.map((plan) => {
            const price = displayPrice(plan.monthlyPrice, billing);

            return (
              <article
                key={plan.id}
                className={`relative overflow-hidden rounded-[28px] border bg-[#0b0b0b] transition-colors ${
                  plan.recommended ? "border-white/30" : "border-white/12"
                }`}
              >
                {plan.recommended ? (
                  <div className="border-b border-white/10 bg-white/5 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                    Recommended
                  </div>
                ) : null}

                <div className="flex flex-col p-6 sm:p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-medium tracking-tight text-white">
                        {plan.name}
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#a1a1aa]">
                        {plan.features[0]}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="block text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        ${price}
                      </span>
                      <span className="mt-1 block text-sm text-[#a1a1aa]">
                        {billing === "annually" ? "per year" : "per month"}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/api/stripe/checkout?plan=${plan.id}&period=${billing}`}
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl border px-5 py-4 text-sm font-semibold transition-colors ${
                      plan.recommended
                        ? "border-white bg-white text-[#111] hover:bg-[#f4f4f5]"
                        : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </a>

                  <div className="my-6 h-px bg-white/10" />

                  <p className="text-sm font-medium text-white/70">Plan highlights:</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {plan.features.map((feature, index) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[#d4d4d8]">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                        </span>
                        {feature}
                        {index === 0 && billing === "annually" ? (
                          <span className="ml-auto rounded-full bg-[#d1fae5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#065f46]">
                            Best value
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
