import { z } from "zod";

const telegramEnvSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, "TELEGRAM_BOT_TOKEN is required"),
  TELEGRAM_CHAT_ID: z.string().min(1, "TELEGRAM_CHAT_ID is required"),
});

const resendEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
});

const siteEnvSchema = z.object({
  SITE_URL: z.string().url("SITE_URL must be a valid URL").default("https://www.solverwebsite.com"),
});

function validateEnv<T extends z.ZodTypeAny>(schema: T, scope: string): z.infer<T> {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    console.error(`Invalid ${scope} environment variables:`);
    for (const [key, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
      console.error(`  - ${key}: ${errors?.join(", ")}`);
    }
    throw new Error(`Invalid ${scope} environment variables. See errors above.`);
  }

  return parsed.data;
}

export function getTelegramEnv() {
  return validateEnv(telegramEnvSchema, "Telegram");
}

export function getResendEnv() {
  return validateEnv(resendEnvSchema, "Resend");
}

export function getSiteEnv() {
  return validateEnv(siteEnvSchema, "site");
}
