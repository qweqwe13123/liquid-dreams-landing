import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { createHostedCheckoutUrl } from "@/lib/stripe-checkout.server";

const PLAN_IDS = ["starter", "pro", "ultra"] as const;

const checkoutSearchSchema = z.object({
  plan: z.enum(PLAN_IDS),
  period: z.enum(["monthly", "annually"]),
});

export const Route = createFileRoute("/api/stripe/checkout")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const search = checkoutSearchSchema.parse({
          plan: url.searchParams.get("plan"),
          period: url.searchParams.get("period"),
        });

        const checkoutUrl = await createHostedCheckoutUrl({
          plan: search.plan,
          period: search.period,
        });

        return Response.redirect(checkoutUrl, 302);
      },
    },
  },
});
