import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { LeadConversationPanel } from "@/components/contact/LeadConversationPanel";
import { LeadInputCard } from "@/components/contact/LeadInputCard";
import { useLeadFlow, useScrollToBottom } from "@/hooks/use-lead-flow";
import { CTA_WHATSAPP_DISPLAY, CTA_WHATSAPP_URL, TELEGRAM_DISPLAY, TELEGRAM_URL } from "@/lib/contact";

type Step = "choose" | "request";

export function ContactExperience() {
  const [step, setStep] = useState<Step>("choose");
  const flow = useLeadFlow();
  const scrollRef = useScrollToBottom([flow.messages, flow.step, flow.status]);

  const startRequest = () => {
    flow.resetFlow();
    setStep("request");
  };

  const backToChoose = () => {
    flow.resetFlow();
    setStep("choose");
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

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-20">
        <div
          ref={scrollRef}
          className={`min-w-0 flex-1 ${step === "request" ? "max-h-[min(85vh,720px)] overflow-y-auto pr-2" : ""}`}
        >
          <p className="text-sm text-[#a39a90]">Solver Team</p>
          <div className="mt-4 flex flex-col gap-3">
            <div className="w-fit max-w-[280px] rounded-2xl rounded-bl-md bg-[#ebe6df] px-4 py-3 text-[15px] leading-snug text-[#4a4540]">
              Hello, hello <span aria-hidden>😊</span>
            </div>
            <div className="w-fit max-w-[300px] rounded-2xl rounded-bl-md bg-[#ebe6df] px-4 py-3 text-[15px] leading-snug text-[#4a4540]">
              We&apos;re glad you&apos;re here <span aria-hidden>👋</span>
            </div>
          </div>

          {step === "request" ? (
            <>
              <LeadConversationPanel messages={flow.messages} userInitial={flow.userInitial} />
              {flow.status === "submitting" ? (
                <div className="mt-4 w-fit rounded-2xl rounded-bl-md bg-[#ebe6df] px-4 py-3 text-sm text-[#8a8178]">
                  Sending your request…
                </div>
              ) : null}
            </>
          ) : (
            <div
              className="mt-5 flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #e67e5f 0%, #d45a3a 100%)" }}
              aria-hidden
            >
              S
            </div>
          )}
        </div>

        <div className="w-full shrink-0 lg:mt-4 lg:w-[min(100%,400px)]">
          {step === "choose" ? (
            <div className="rounded-2xl border border-[#e8e2d9] bg-white/95 p-6 shadow-[0_20px_60px_-24px_rgba(61,56,50,0.18)] sm:p-8">
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
                    onClick={startRequest}
                    className="flex w-full items-center gap-4 rounded-xl border border-[#ece7e0] bg-[#faf8f5] px-4 py-4 text-left transition-colors hover:border-[#c4b8a8] hover:bg-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c2824]/8 text-[#2c2824]">
                      <span className="text-sm font-semibold">✉</span>
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-[#2c2824]">Leave a request</span>
                      <span className="text-sm text-[#8a8178]">Quick chat — we&apos;ll reach out soon</span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={backToChoose}
                disabled={flow.status === "submitting"}
                className="self-start text-sm text-[#a39a90] transition-colors hover:text-[#2c2824] disabled:opacity-50"
              >
                ← Other ways to connect
              </button>
              {flow.step !== "done" ? (
                <LeadInputCard
                  step={flow.step}
                  textInput={flow.textInput}
                  onTextChange={flow.setTextInput}
                  selectedOption={flow.selectedOption}
                  onSelectOption={flow.setSelectedOption}
                  otherText={flow.otherText}
                  onOtherChange={flow.setOtherText}
                  error={flow.error}
                  disabled={flow.status === "submitting"}
                  onSubmitText={() => void flow.submitTextStep()}
                  onSubmitChoice={() => void flow.submitChoiceStep()}
                  onSkipMessenger={() => flow.skipMessenger()}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
