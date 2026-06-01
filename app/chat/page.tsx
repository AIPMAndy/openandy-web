"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType, sendMessageToDifyStream } from "@/lib/dify";
import ChatMessage from "@/components/ChatMessage";
import Navigation from "@/components/Navigation";

const WELCOME_MESSAGE: ChatMessageType = {
  id: "welcome",
  role: "assistant",
  content: `你好！我是 AI酋长Andy 的 AI 分身 🤖

基于 Andy 的公开项目和内容训练而成，可以帮你：

• 了解 Andy 的开源项目
• 解答 AI 产品相关问题
• 分享技术学习路径
• 提供项目使用建议

有什么想问的，尽管说～`,
  timestamp: Date.now(),
};

function ChatContent() {
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

    // 创建一个临时的 assistant 消息用于流式更新
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
          // 流式更新消息内容
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: chunk }
                : msg
            )
          );
        },
        () => {
          // 完成
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
            💬 与 AI酋长Andy 对话
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            基于Andy的公开项目和内容训练，内容由AI生成
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入你的问题..."
              className="flex-1 px-4 py-3 bg-bg border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-muted"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 bg-text-primary text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-text-secondary transition-colors"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return <ChatContent />;
}
