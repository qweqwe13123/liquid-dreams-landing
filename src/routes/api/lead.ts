import { createFileRoute } from "@tanstack/react-router";

import { leadSchema } from "@/lib/lead-schema";
import { sendLeadToTelegram } from "@/lib/telegram.server";

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;

        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }

        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            {
              error: parsed.error.issues[0]?.message ?? "Please check your answers.",
            },
            { status: 400 },
          );
        }

        try {
          await sendLeadToTelegram(parsed.data);
          return Response.json({ success: true });
        } catch (error) {
          console.error("lead submission error:", error);
          return Response.json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to deliver your request. Please try again later.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
