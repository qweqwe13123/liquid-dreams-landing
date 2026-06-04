import { useCallback, useEffect, useRef, useState } from "react";
import { submitLead } from "@/lib/api/lead.functions";
import {
  LEAD_QUESTIONS,
  leadSchema,
  type LeadFieldKey,
  type LeadPayload,
  validateLeadField,
} from "@/lib/lead-schema";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

type Answers = Partial<Record<LeadFieldKey, string>>;

type LeadChatQuestionnaireProps = {
  onBack: () => void;
};

const SUCCESS_MESSAGE = "Thank you. We will contact you shortly.";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function LeadChatQuestionnaire({ onBack }: LeadChatQuestionnaireProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: newId(), role: "bot", text: "Hi! I'll ask you a few quick questions." },
    { id: newId(), role: "bot", text: LEAD_QUESTIONS[0].prompt },
  ]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"active" | "submitting" | "success">("active");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion = LEAD_QUESTIONS[questionIndex];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status, error]);

  useEffect(() => {
    if (status === "active") {
      inputRef.current?.focus();
    }
  }, [questionIndex, status]);

  const submitToTelegram = useCallback(async (payload: LeadPayload) => {
    setStatus("submitting");
    setError(null);

    try {
      await submitLead({ data: payload });
      setMessages((prev) => [...prev, { id: newId(), role: "bot", text: SUCCESS_MESSAGE }]);
      setStatus("success");
    } catch (err) {
      setStatus("active");
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    }
  }, []);

  const handleSubmitAnswer = useCallback(async () => {
    if (status !== "active" || !currentQuestion) return;

    const trimmed = input.trim();
    const validationError = validateLeadField(currentQuestion.key, trimmed);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const nextAnswers = { ...answers, [currentQuestion.key]: trimmed };
    setAnswers(nextAnswers);
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: newId(), role: "user", text: trimmed },
    ]);

    const isLast = questionIndex >= LEAD_QUESTIONS.length - 1;

    if (isLast) {
      const parsed = leadSchema.safeParse(nextAnswers);
      if (!parsed.success) {
        setError(parsed.error.errors[0]?.message ?? "Please check your answers.");
        return;
      }
      await submitToTelegram(parsed.data);
      return;
    }

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    setMessages((prev) => [
      ...prev,
      { id: newId(), role: "bot", text: LEAD_QUESTIONS[nextIndex].prompt },
    ]);
  }, [answers, currentQuestion, input, questionIndex, status, submitToTelegram]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmitAnswer();
    }
  };

  return (
    <div className="flex min-h-[420px] flex-col">
      <button
        type="button"
        onClick={onBack}
        disabled={status === "submitting"}
        className="text-sm text-[#a39a90] transition-colors hover:text-[#2c2824] disabled:opacity-50"
      >
        ← Back
      </button>

      <p className="mt-4 text-sm text-[#a39a90]">Leave a request</p>
      <h2 className="mt-1 text-xl font-medium text-[#2c2824]">Chat with our team</h2>

      <div
        ref={scrollRef}
        className="mt-6 flex max-h-[min(52vh,360px)] min-h-[220px] flex-1 flex-col gap-3 overflow-y-auto pr-1"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
                msg.role === "user"
                  ? "rounded-br-md bg-[#2c2824] text-white"
                  : "rounded-bl-md bg-[#ebe6df] text-[#4a4540]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {status === "submitting" ? (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md bg-[#ebe6df] px-4 py-2.5 text-sm text-[#8a8178]">
              Sending your request…
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-3 text-sm text-[#c2410c]" role="alert">
          {error}
        </p>
      ) : null}

      {status === "success" ? (
        <p className="mt-4 text-center text-sm text-[#16a34a]">{SUCCESS_MESSAGE}</p>
      ) : (
        <div className="mt-4 border-t border-[#ece7e0] pt-4">
          <label className="sr-only" htmlFor="lead-chat-input">
            {currentQuestion?.prompt ?? "Your answer"}
          </label>
          <div className="flex items-end gap-2">
            <input
              id="lead-chat-input"
              ref={inputRef}
              type={currentQuestion?.key === "email" ? "email" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={status === "submitting"}
              placeholder="Type your answer…"
              autoComplete={currentQuestion?.key === "email" ? "email" : "off"}
              className="min-w-0 flex-1 border-0 border-b border-[#e0d9cf] bg-transparent py-2 text-[#2c2824] placeholder:text-[#c4bcb2] placeholder:italic focus:border-[#2c2824] focus:outline-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => void handleSubmitAnswer()}
              disabled={status === "submitting" || !input.trim()}
              className="shrink-0 rounded-lg border border-[#e0d9cf] px-3 py-2 text-sm font-medium text-[#6b6560] transition-colors hover:border-[#2c2824] hover:text-[#2c2824] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↵
            </button>
          </div>
          <p className="mt-2 text-xs text-[#b5aea4]">Press Enter to send</p>
        </div>
      )}
    </div>
  );
}
