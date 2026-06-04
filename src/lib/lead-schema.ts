import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  role: z.string().trim().min(1, "Please tell us who you are").max(100),
  company: z.string().trim().min(1, "Company name is required").max(200),
  email: z.string().trim().email("Please enter a valid email address").max(320),
  messengerContact: z.string().trim().max(200),
  service: z.string().trim().min(1, "Please select or describe a service").max(500),
  budget: z.string().trim().min(1, "Please select or enter a budget").max(200),
  timeline: z.string().trim().min(1, "Please select a timeline").max(100),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export type LeadFlowStep =
  | "name"
  | "role"
  | "company"
  | "email"
  | "messenger"
  | "service"
  | "budget"
  | "timeline"
  | "done";

export const SERVICE_OPTIONS = [
  "Web & app development",
  "UI/UX design",
  "Branding & identity",
  "Automation & integrations",
  "Marketing & growth",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Less than $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000+",
  "Other",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP",
  "1 - 2 weeks",
  "1 - 2 months",
  "No rush, flexible",
] as const;
