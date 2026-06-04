import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { PLANS, type BillingPeriod, type PlanId } from "@/lib/stripe-config";

const checkoutInput = z.object({
  plan: z.enum(["starter", "pro", "ultra"]),
  period: z.enum(["monthly", "annually"]),
});

/**
 * Create a Stripe Checkout session in embedded UI mode.
 * Returns { clientSecret } so the frontend can mount <EmbeddedCheckout />.
 */
export const createCheckoutSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => checkoutInput.parse(input))
  .handler(async ({ data, context }) => {
    const { getStripe } = await import("@/lib/stripe.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const stripe = getStripe();
    const userId = context.userId;

    // Load profile (created automatically by handle_new_user trigger)
    const { data: profile, error: profileErr } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, stripe_customer_id")
      .eq("id", userId)
      .maybeSingle();
    if (profileErr) throw new Error(profileErr.message);
    if (!profile) throw new Error("Profile not found");

    // Ensure Stripe customer
    let customerId = profile.stripe_customer_id ?? undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile.email,
        name: profile.full_name ?? undefined,
        metadata: { user_id: userId },
      });
      customerId = customer.id;
      await supabaseAdmin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
    }

    const priceId = PLANS[data.plan as PlanId].prices[data.period as BillingPeriod];
    const origin = process.env.SITE_URL || "https://solverwebsite.com";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded" as never,
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: { user_id: userId, plan: data.plan, billing_period: data.period },
      },
      metadata: { user_id: userId, plan: data.plan, billing_period: data.period },
      return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return { clientSecret: session.client_secret };
  });

/**
 * Returns the Stripe publishable key (client-safe, but kept on server to avoid build-time inlining).
 */
export const getStripePublishableKeyFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const key = process.env.STRIPE_PUBLISHABLE_KEY;
    if (!key) throw new Error("STRIPE_PUBLISHABLE_KEY is not configured");
    return { publishableKey: key };
  });

/**
 * Get current user's subscription + recent payments for the account page.
 */
export const getMyBillingInfo = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    const [subRes, payRes, profileRes] = await Promise.all([
      supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabaseAdmin
        .from("payment_history")
        .select("*")
        .eq("user_id", userId)
        .order("paid_at", { ascending: false, nullsFirst: false })
        .limit(20),
      supabaseAdmin
        .from("profiles")
        .select("email, full_name")
        .eq("id", userId)
        .maybeSingle(),
    ]);

    return {
      subscription: subRes.data,
      payments: payRes.data ?? [],
      profile: profileRes.data,
    };
  });

/**
 * Cancel the current subscription at the end of the billing period.
 */
export const cancelMySubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { getStripe } = await import("@/lib/stripe.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const stripe = getStripe();
    const userId = context.userId;

    const { data: sub, error } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_subscription_id, status")
      .eq("user_id", userId)
      .in("status", ["active", "trialing", "past_due"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!sub) throw new Error("No active subscription found");

    const updated = (await stripe.subscriptions.update(sub.stripe_subscription_id, {
      cancel_at_period_end: true,
    })) as unknown as { cancel_at_period_end: boolean; current_period_end: number };

    return {
      cancelAtPeriodEnd: updated.cancel_at_period_end,
      currentPeriodEnd: new Date(updated.current_period_end * 1000).toISOString(),
    };
  });

/**
 * Re-activate a subscription that's set to cancel at period end.
 */
export const resumeMySubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { getStripe } = await import("@/lib/stripe.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const stripe = getStripe();
    const userId = context.userId;

    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_subscription_id")
      .eq("user_id", userId)
      .eq("cancel_at_period_end", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!sub) throw new Error("No subscription scheduled to cancel");

    const updated = await stripe.subscriptions.update(sub.stripe_subscription_id, {
      cancel_at_period_end: false,
    });
    return { cancelAtPeriodEnd: updated.cancel_at_period_end };
  });

/**
 * Create a Stripe Billing Portal session so the user can update card/invoices.
 */
export const createBillingPortalSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { getStripe } = await import("@/lib/stripe.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const stripe = getStripe();
    const userId = context.userId;

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", userId)
      .maybeSingle();
    if (!profile?.stripe_customer_id) throw new Error("No Stripe customer found");

    const origin = process.env.SITE_URL || "https://solverwebsite.com";
    const portal = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/account/billing`,
    });
    return { url: portal.url };
  });