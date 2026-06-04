import { createServerFn } from "@tanstack/react-start";

import { leadSchema } from "../lead-schema";
import { sendLeadToTelegram } from "../telegram.server";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(leadSchema)
  .handler(async ({ data }) => {
    try {
      await sendLeadToTelegram(data);
      return { success: true as const };
    } catch (error) {
      console.error("submitLead error:", error);
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      throw new Error(message);
    }
  });
