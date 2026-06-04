import type { LeadPayload } from "../lead-schema";

type LeadSubmissionResponse = { success: true } | { error: string };

export async function submitLead(payload: LeadPayload): Promise<{ success: true }> {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: LeadSubmissionResponse | null = null;
  try {
    data = (await response.json()) as LeadSubmissionResponse;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data && "error" in data ? data.error : "Something went wrong. Please try again.",
    );
  }

  return { success: true };
}
