import type { ConversationMessage } from "@/hooks/use-lead-flow";

type LeadConversationPanelProps = {
  messages: ConversationMessage[];
  userInitial: string;
};

export function LeadConversationPanel({ messages, userInitial }: LeadConversationPanelProps) {
  return (
    <div className="mt-6 flex flex-col gap-5">
      {messages.map((msg) => {
        if (msg.kind === "user") {
          return (
            <div key={msg.id} className="flex flex-col items-end gap-1.5">
              {msg.meta ? (
                <p className="max-w-[260px] text-right text-xs text-[#a39a90]">{msg.meta}</p>
              ) : null}
              <p className="max-w-[280px] text-right text-[15px] text-[#2c2824]">{msg.text}</p>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: "#7d9b8a" }}
                aria-hidden
              >
                {userInitial}
              </div>
            </div>
          );
        }

        const isDark = msg.kind === "bot-dark";
        return (
          <div key={msg.id} className="flex flex-col items-start gap-2">
            <div
              className={`max-w-[min(100%,320px)] whitespace-pre-line rounded-2xl px-4 py-3 text-[15px] leading-snug ${
                isDark
                  ? "rounded-bl-md bg-[#2c2824] text-white"
                  : "rounded-bl-md bg-[#ebe6df] text-[#4a4540]"
              }`}
            >
              {msg.text}
            </div>
            {isDark ? (
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #e67e5f 0%, #d45a3a 100%)" }}
                aria-hidden
              >
                S
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
