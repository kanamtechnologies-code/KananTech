"use client";

import type { UIMessage } from "ai";
import { Bot, User } from "lucide-react";

function getText(message: UIMessage) {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p: any) => p.text)
    .join("");
}

export default function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const text = getText(message);

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-emerald-tint border border-emerald-primary/20 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-emerald-dark" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl border px-4 py-3 shadow-sm ${
          isUser
            ? "bg-emerald-primary text-white border-emerald-primary"
            : "bg-white text-secondary-text border-border"
        }`}
      >
        <div className="text-sm whitespace-pre-line leading-relaxed">
          {text}
        </div>

        {isAssistant && (
          <div className="mt-2 text-[11px] text-muted-text">
            AI assistant — verify critical details.
          </div>
        )}
      </div>

      {isUser && (
        <div className="h-8 w-8 rounded-full bg-section-bg border border-border flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-muted-text" />
        </div>
      )}
    </div>
  );
}

