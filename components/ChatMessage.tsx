"use client";

import { ChatMessage as ChatMessageType } from "@/lib/dify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        <div className="text-sm font-light leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 自定义样式
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="ml-2">{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                ) : (
                  <code className="block bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                    {children}
                  </code>
                );
              },
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-text-muted text-white flex items-center justify-center text-sm ml-2 flex-shrink-0">
          👤
        </div>
      )}
    </div>
  );
}
