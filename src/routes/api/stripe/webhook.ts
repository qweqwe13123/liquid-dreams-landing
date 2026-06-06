import { createFileRoute } from "@tanstack/react-router";

import { processStripeWebhook } from "@/lib/stripe-webhook.server";

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text();
        const signature = request.headers.get("stripe-signature");

        try {
          return await processStripeWebhook(body, signature);
        } catch (error) {
          console.error("Stripe webhook error:", error);
          return Response.json(
            {
              error: error instanceof Error ? error.message : "Invalid Stripe webhook event.",
            },
            { status: 400 },
          );
        }
      },
    },
  },
});
