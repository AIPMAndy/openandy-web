"use client";

import { ChatMessage as ChatMessageType } from "@/lib/dify";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-text-primary text-white flex items-center justify-center text-sm mr-2 flex-shrink-0">
          🤖
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 ${
          isUser
            ? "bg-text-primary text-white rounded-2xl rounded-br-sm"
            : "bg-white text-text-primary rounded-2xl rounded-bl-sm border border-border"
        }`}
      >
        <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-text-muted text-white flex items-center justify-center text-sm ml-2 flex-shrink-0">
          👤
        </div>
      )}
    </div>
  );
}
