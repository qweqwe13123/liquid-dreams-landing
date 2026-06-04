import type { LeadPayload } from "./lead-schema";

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    throw new Error("Telegram is not configured on the server.");
  }

  return { token, chatId };
}

function formatLeadMessage(lead: LeadPayload): string {
  return [
    "🔥 New Lead",
    "",
    `👤 Name: ${lead.name}`,
    `💼 Role: ${lead.role}`,
    `🏢 Company: ${lead.company}`,
    `📧 Email: ${lead.email}`,
    `⚙️ Service: ${lead.service}`,
    `💰 Budget: ${lead.budget}`,
    `📅 Timeline: ${lead.timeline}`,
  ].join("\n");
}

export async function sendLeadToTelegram(lead: LeadPayload): Promise<void> {
  const { token, chatId } = getTelegramConfig();
  const text = formatLeadMessage(lead);

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Telegram API error:", response.status, detail);
    throw new Error("Failed to deliver your request. Please try again later.");
  }

  const payload = (await response.json()) as { ok?: boolean; description?: string };
  if (!payload.ok) {
    console.error("Telegram API rejected message:", payload.description);
    throw new Error("Failed to deliver your request. Please try again later.");
  }
}
