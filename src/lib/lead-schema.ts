import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  company: z.string().trim().min(1, "Company name is required").max(200),
  service: z.string().trim().min(1, "Service is required").max(500),
  budget: z.string().trim().min(1, "Budget is required").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(320),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export const LEAD_QUESTIONS = [
  { key: "name" as const, prompt: "What is your name?" },
  { key: "company" as const, prompt: "What is your company name?" },
  { key: "service" as const, prompt: "What service are you interested in?" },
  { key: "budget" as const, prompt: "What is your budget?" },
  { key: "email" as const, prompt: "What is your email address?" },
] as const;

export type LeadFieldKey = (typeof LEAD_QUESTIONS)[number]["key"];

const fieldSchemas: Record<LeadFieldKey, z.ZodString> = {
  name: leadSchema.shape.name,
  company: leadSchema.shape.company,
  service: leadSchema.shape.service,
  budget: leadSchema.shape.budget,
  email: leadSchema.shape.email,
};

export function validateLeadField(key: LeadFieldKey, value: string): string | null {
  const result = fieldSchemas[key].safeParse(value);
  if (result.success) return null;
  return result.error.errors[0]?.message ?? "Invalid input";
}
