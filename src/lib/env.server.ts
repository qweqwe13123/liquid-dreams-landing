import { z } from "zod";

const envSchema = z.object({
  // Stripe (subscriptions / billing)
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1, "STRIPE_PUBLISHABLE_KEY is required"),

  // Supabase (server / SSR / middleware)
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL").min(1, "SUPABASE_URL is required"),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1, "SUPABASE_PUBLISHABLE_KEY is required"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),

  // Resend (transactional email)
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),

  // Site origin
  SITE_URL: z.string().url("SITE_URL must be a valid URL").default("https://www.solverwebsite.com"),

  // Contact form (Telegram lead notifications)
  TELEGRAM_BOT_TOKEN: z.string().min(1, "TELEGRAM_BOT_TOKEN is required"),
  TELEGRAM_CHAT_ID: z.string().min(1, "TELEGRAM_CHAT_ID is required"),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    for (const [key, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      console.error(`  - ${key}: ${errors?.join(", ")}`);
    }
    throw new Error("Invalid environment variables. See errors above.");
  }

  return parsed.data;
}

export const env = validateEnv();
