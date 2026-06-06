"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType, sendMessageToDifyStream } from "@/lib/dify";
import ChatMessage from "@/components/ChatMessage";
import Navigation from "@/components/Navigation";
import { useLocale } from "@/contexts/LocaleContext";

function ChatContent() {
  const { t } = useLocale();

  const WELCOME_MESSAGE: ChatMessageType = {
    id: "welcome",
    role: "assistant",
    content: t.chat.welcome,
    timestamp: Date.now(),
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessageType = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      await sendMessageToDifyStream(
        input.trim(),
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: chunk }
                : msg
            )
          );
        },
        () => {
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col pt-20">
      <Navigation />
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-lg font-normal text-text-primary">
            {t.chat.title}
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            {t.chat.subtitle}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Starter Questions - Show only when no messages except welcome */}
          {messages.length === 1 && (
            <div className="mb-6 p-6 bg-white rounded-lg border border-border">
              <p className="text-sm font-medium text-text-primary mb-3">{t.chat.starterTitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {t.chat.starterQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(question)}
                    className="text-left text-sm text-text-muted hover:text-text-primary hover:bg-bg px-3 py-2 rounded border border-border hover:border-text-muted transition-colors"
                  >
                    💬 {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-text-primary text-white flex items-center justify-center text-sm mr-2 flex-shrink-0">
                🤖
              </div>
              <div className="bg-white text-text-primary rounded-2xl rounded-bl-sm border border-border px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.chat.placeholder}
                className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-muted"
                disabled={isLoading}
                maxLength={2000}
              />
              <div className="absolute right-3 bottom-3 text-xs text-text-muted">
                {input.length}/2000
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-text-primary text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-text-secondary transition-colors"
            >
              {t.chat.sendBtn}
            </button>
          </div>
          <p className="text-xs text-text-muted mt-2 text-center">{t.chat.inputHint}</p>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return <ChatContent />;
}
