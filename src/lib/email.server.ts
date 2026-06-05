import { Resend } from "resend";
import { BRAND } from "./stripe-config";

import { getResendEnv } from "./env.server";

let _resend: Resend | null = null;

function resend(): Resend {
  if (_resend) return _resend;
  const env = getResendEnv();
  _resend = new Resend(env.RESEND_API_KEY);
  return _resend;
}

function formatAmount(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function shell(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
        <tr><td style="padding:32px 40px 0 40px;">
          <div style="font-family:'Instrument Serif',Georgia,serif;font-size:28px;font-weight:600;color:${BRAND.color};letter-spacing:-0.02em;">${BRAND.name}</div>
        </td></tr>
        <tr><td style="padding:24px 40px 40px 40px;font-size:15px;line-height:1.6;color:#374151;">
          ${bodyHtml}
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af;text-align:center;">
          Need help? Email us at <a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.color};text-decoration:none;">${BRAND.supportEmail}</a><br/>
          <a href="${BRAND.websiteUrl}" style="color:#9ca3af;text-decoration:none;">${BRAND.websiteUrl}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function button(href: string, label: string): string {
  return `<div style="margin:24px 0;"><a href="${href}" style="display:inline-block;background:${BRAND.color};color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;font-size:14px;">${label}</a></div>`;
}

async function send(opts: { to: string; subject: string; html: string }) {
  try {
    const res = await resend().emails.send({
      from: BRAND.fromEmail,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    if ((res as { error?: { message: string } }).error) {
      console.error("[email] send failed:", (res as { error: { message: string } }).error);
    }
    return res;
  } catch (err) {
    console.error("[email] resend exception:", err);
    return null;
  }
}

// ============================================================
// Email templates
// ============================================================

export async function sendPurchaseThankYouEmail(to: string, planName: string) {
  return send({
    to,
    subject: `Thanks for your order — ${BRAND.name} ${planName}`,
    html: shell(
      "Thank you",
      `<h1 style="font-size:22px;margin:0 0 16px 0;color:${BRAND.color};">Payment received, thank you!</h1>
       <p>We&apos;ve received your payment for <strong>${BRAND.name} ${planName}</strong>.</p>
       <p>Your subscription is now active, and you&apos;ll keep receiving service updates and renewal notices here.</p>
       <p style="color:#6b7280;font-size:13px;">If you have questions or need help, just reply to this email. We read every message.</p>
       <p style="margin-top:32px;">— The ${BRAND.name} team</p>`,
    ),
  });
}

export async function sendPaymentConfirmationEmail(opts: {
  to: string;
  planName: string;
  amount: number; // cents
  currency: string;
  paidAt: Date | string;
  invoiceUrl?: string | null;
  receiptUrl?: string | null;
}) {
  const links: string[] = [];
  if (opts.receiptUrl) {
    links.push(`<a href="${opts.receiptUrl}" style="color:${BRAND.color};">View receipt</a>`);
  }
  if (opts.invoiceUrl) {
    links.push(
      `<a href="${opts.invoiceUrl}" style="color:${BRAND.color};">Download invoice (PDF)</a>`,
    );
  }

  return send({
    to: opts.to,
    subject: `Payment received — ${formatAmount(opts.amount, opts.currency)}`,
    html: shell(
      "Payment confirmation",
      `<h1 style="font-size:22px;margin:0 0 16px 0;color:${BRAND.color};">Payment received ✓</h1>
       <p>Thank you! We received your payment for <strong>${BRAND.name} ${opts.planName}</strong>.</p>
       <table style="width:100%;border-collapse:collapse;margin:20px 0;background:#f9fafb;border-radius:12px;">
         <tr><td style="padding:12px 16px;color:#6b7280;">Amount</td><td style="padding:12px 16px;text-align:right;font-weight:600;">${formatAmount(opts.amount, opts.currency)}</td></tr>
         <tr><td style="padding:12px 16px;color:#6b7280;border-top:1px solid #eef0f3;">Date</td><td style="padding:12px 16px;text-align:right;border-top:1px solid #eef0f3;">${formatDate(opts.paidAt)}</td></tr>
         <tr><td style="padding:12px 16px;color:#6b7280;border-top:1px solid #eef0f3;">Plan</td><td style="padding:12px 16px;text-align:right;border-top:1px solid #eef0f3;">${opts.planName}</td></tr>
       </table>
       ${links.length ? `<p>${links.join(" · ")}</p>` : ""}
       ${button(`${BRAND.websiteUrl}/account/billing`, "View billing history")}`,
    ),
  });
}

export async function sendRenewalEmail(opts: {
  to: string;
  planName: string;
  amount: number;
  currency: string;
  paidAt: Date | string;
  nextRenewal?: Date | string | null;
  receiptUrl?: string | null;
}) {
  return send({
    to: opts.to,
    subject: `Subscription renewed — ${formatAmount(opts.amount, opts.currency)}`,
    html: shell(
      "Subscription renewed",
      `<h1 style="font-size:22px;margin:0 0 16px 0;color:${BRAND.color};">Your subscription was renewed</h1>
       <p>We've successfully charged your card for <strong>${BRAND.name} ${opts.planName}</strong>.</p>
       <table style="width:100%;border-collapse:collapse;margin:20px 0;background:#f9fafb;border-radius:12px;">
         <tr><td style="padding:12px 16px;color:#6b7280;">Amount charged</td><td style="padding:12px 16px;text-align:right;font-weight:600;">${formatAmount(opts.amount, opts.currency)}</td></tr>
         <tr><td style="padding:12px 16px;color:#6b7280;border-top:1px solid #eef0f3;">Charged on</td><td style="padding:12px 16px;text-align:right;border-top:1px solid #eef0f3;">${formatDate(opts.paidAt)}</td></tr>
         ${opts.nextRenewal ? `<tr><td style="padding:12px 16px;color:#6b7280;border-top:1px solid #eef0f3;">Next renewal</td><td style="padding:12px 16px;text-align:right;border-top:1px solid #eef0f3;">${formatDate(opts.nextRenewal)}</td></tr>` : ""}
       </table>
       ${opts.receiptUrl ? `<p><a href="${opts.receiptUrl}" style="color:${BRAND.color};">View receipt</a></p>` : ""}
       ${button(`${BRAND.websiteUrl}/account/billing`, "Manage subscription")}`,
    ),
  });
}

export async function sendPaymentFailedEmail(opts: {
  to: string;
  planName: string;
  amount: number;
  currency: string;
}) {
  return send({
    to: opts.to,
    subject: `Action required: payment failed for ${BRAND.name}`,
    html: shell(
      "Payment failed",
      `<h1 style="font-size:22px;margin:0 0 16px 0;color:#dc2626;">We couldn't process your payment</h1>
       <p>Your latest payment of <strong>${formatAmount(opts.amount, opts.currency)}</strong> for <strong>${BRAND.name} ${opts.planName}</strong> was declined.</p>
       <p>To avoid an interruption, please update your payment method as soon as possible.</p>
       ${button(`${BRAND.websiteUrl}/account/billing`, "Update payment method")}
       <p style="color:#6b7280;font-size:13px;">Common reasons: card expired, insufficient funds, or your bank rejected the charge. If you need help, reply to this email.</p>`,
    ),
  });
}

export async function sendCancellationEmail(opts: {
  to: string;
  planName: string;
  accessUntil: Date | string | null;
}) {
  return send({
    to: opts.to,
    subject: `Your ${BRAND.name} subscription has been canceled`,
    html: shell(
      "Subscription canceled",
      `<h1 style="font-size:22px;margin:0 0 16px 0;color:${BRAND.color};">Your subscription is canceled</h1>
       <p>We've received your cancellation for <strong>${BRAND.name} ${opts.planName}</strong>.</p>
       ${opts.accessUntil ? `<p>You'll keep full access until <strong>${formatDate(opts.accessUntil)}</strong>. After that, the subscription won't renew and no further charges will be made.</p>` : `<p>Your access has ended and no further charges will be made.</p>`}
       <p>Changed your mind? You can resubscribe anytime.</p>
       ${button(`${BRAND.websiteUrl}/subscriptions`, "Resubscribe")}
       <p style="margin-top:32px;color:#6b7280;font-size:13px;">We'd love to hear what we could improve — just reply to this email.</p>`,
    ),
  });
}
