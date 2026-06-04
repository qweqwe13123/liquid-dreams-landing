import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import {
  CONTACT_EMAIL,
  CTA_WHATSAPP_DISPLAY,
  CTA_WHATSAPP_URL,
  TELEGRAM_DISPLAY,
  TELEGRAM_URL,
} from "@/lib/contact";

type Step = "choose" | "request";

export function ContactExperience() {
  const [step, setStep] = useState<Step>("choose");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitRequest = () => {
    const subject = encodeURIComponent("New contact request — Solver");
    const body = encodeURIComponent(
      `Name: ${name || "—"}\nEmail: ${email || "—"}\n\nMessage:\n${message || "—"}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-8 sm:py-14"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #faf6f0 0%, #efe6d8 45%, #e8dece 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 72% 38%, rgba(255,255,255,0.55) 0%, transparent 42%),
            radial-gradient(circle at 28% 62%, rgba(255,255,255,0.35) 0%, transparent 38%)
          `,
        }}
        aria-hidden
      />

      <Link
        to="/"
        className="relative z-10 mb-10 inline-flex items-center gap-2 text-sm text-[#8a8178] transition-colors hover:text-[#3d3832]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="max-w-md lg:pt-6">
          <p className="text-sm text-[#a39a90]">Solver Team</p>
          <div className="mt-4 flex flex-col gap-3">
            <div className="w-fit max-w-[280px] rounded-2xl rounded-bl-md bg-[#ebe6df] px-4 py-3 text-[15px] leading-snug text-[#4a4540]">
              Hello, hello <span aria-hidden>😊</span>
            </div>
            <div className="w-fit max-w-[300px] rounded-2xl rounded-bl-md bg-[#ebe6df] px-4 py-3 text-[15px] leading-snug text-[#4a4540]">
              We&apos;re glad you&apos;re here <span aria-hidden>👋</span>
            </div>
          </div>
          <div
            className="mt-5 flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #e67e5f 0%, #d45a3a 100%)" }}
            aria-hidden
          >
            S
          </div>
        </div>

        <div className="w-full max-w-md lg:mt-4">
          <div className="rounded-2xl border border-[#e8e2d9] bg-white/95 p-6 shadow-[0_20px_60px_-24px_rgba(61,56,50,0.18)] sm:p-8">
            {step === "choose" ? (
              <>
                <p className="text-sm text-[#a39a90]">Get in touch</p>
                <h1 className="mt-2 text-xl font-medium leading-snug text-[#2c2824] sm:text-2xl">
                  Choose how you&apos;d like to connect with us
                </h1>

                <ul className="mt-8 flex flex-col gap-3">
                  <li>
                    <a
                      href={CTA_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-[#ece7e0] bg-[#faf8f5] px-4 py-4 transition-colors hover:border-[#25D366]/40 hover:bg-[#f0fdf4]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                        <MessageCircle className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-[#2c2824]">WhatsApp</span>
                        <span className="text-sm text-[#8a8178]">{CTA_WHATSAPP_DISPLAY}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-[#ece7e0] bg-[#faf8f5] px-4 py-4 transition-colors hover:border-[#229ED9]/40 hover:bg-[#f0f9ff]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#229ED9]/15 text-[#229ED9]">
                        <Send className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-[#2c2824]">Telegram</span>
                        <span className="text-sm text-[#8a8178]">{TELEGRAM_DISPLAY}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setStep("request")}
                      className="flex w-full items-center gap-4 rounded-xl border border-[#ece7e0] bg-[#faf8f5] px-4 py-4 text-left transition-colors hover:border-[#c4b8a8] hover:bg-white"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c2824]/8 text-[#2c2824]">
                        <span className="text-sm font-semibold">✉</span>
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-[#2c2824]">Leave a request</span>
                        <span className="text-sm text-[#8a8178]">We&apos;ll get back to you by email</span>
                      </span>
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep("choose")}
                  className="text-sm text-[#a39a90] transition-colors hover:text-[#2c2824]"
                >
                  ← Back
                </button>
                <p className="mt-4 text-sm text-[#a39a90]">Leave a request</p>
                <h2 className="mt-1 text-xl font-medium text-[#2c2824]">Tell us a bit about you</h2>

                <div className="mt-8 space-y-6">
                  <label className="block">
                    <span className="text-sm text-[#a39a90]">My name is</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name…"
                      className="mt-2 w-full border-0 border-b border-[#e0d9cf] bg-transparent py-2 text-[#2c2824] placeholder:text-[#c4bcb2] placeholder:italic focus:border-[#2c2824] focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-[#a39a90]">Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="mt-2 w-full border-0 border-b border-[#e0d9cf] bg-transparent py-2 text-[#2c2824] placeholder:text-[#c4bcb2] placeholder:italic focus:border-[#2c2824] focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-[#a39a90]">Message</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What would you like to build?"
                      rows={3}
                      className="mt-2 w-full resize-none border-0 border-b border-[#e0d9cf] bg-transparent py-2 text-[#2c2824] placeholder:text-[#c4bcb2] placeholder:italic focus:border-[#2c2824] focus:outline-none"
                    />
                  </label>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={submitRequest}
                    className="rounded-lg border border-[#e0d9cf] px-4 py-2 text-sm font-medium text-[#6b6560] transition-colors hover:border-[#2c2824] hover:text-[#2c2824]"
                  >
                    Send ↵
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
