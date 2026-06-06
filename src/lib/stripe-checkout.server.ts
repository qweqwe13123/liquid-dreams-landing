import { PLANS, type BillingPeriod, type PlanId } from "@/lib/stripe-config";
import { getSiteEnv } from "@/lib/env.server";
import { getStripe } from "@/lib/stripe.server";

export async function createHostedCheckoutUrl(input: { plan: PlanId; period: BillingPeriod }) {
  const stripe = getStripe();
  const origin = getSiteEnv().SITE_URL || "https://www.solverwebsite.com";
  const priceId = PLANS[input.plan].prices[input.period];
  const brandingLogoUrl = `${origin}/og-image.png`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/subscriptions`,
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    metadata: { plan: input.plan, billing_period: input.period },
    subscription_data: {
      metadata: { plan: input.plan, billing_period: input.period },
    },
    branding_settings: {
      display_name: "Solver Company",
      background_color: "#050505",
      button_color: "#ffffff",
      border_style: "rounded",
      font_family: "inter",
      logo: {
        type: "url",
        url: brandingLogoUrl,
      },
    },
    custom_text: {
      submit: {
        message: `Thanks for choosing ${PLANS[input.plan].name} with Solver.`,
      },
    },
  });

  if (!session.url) {
    throw new Error("Stripe Checkout session URL was not created.");
  }

  return session.url;
}
