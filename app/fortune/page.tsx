"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function FortunePage() {
  const [formData, setFormData] = useState({
    name: "",
    formerName: "",
    gender: "",
    isAlive: "是",
    birthPlace: "",
    solarDate: "",
    lunarDate: "",
    birthTime: "",
    currentYear: new Date().getFullYear().toString(),
    question: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "测试失败");
      }

      setResult(data.result);
    } catch (error) {
      console.error("Fortune error:", error);
      setResult("❌ 服务暂时不可用，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            AI 帮你测一测
          </h1>
          <p className="text-gray-600">
            融合传统智慧与 AI 洞察，为你指点迷津
          </p>
          <p className="text-sm text-gray-500 mt-2">
            💡 信息越全，测试质量越好
          </p>
        </div>

        {/* Form */}
        {!result ? (
          <div className="bg-white rounded-lg border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基础信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="请输入姓名"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    曾用名
                  </label>
                  <input
                    type="text"
                    name="formerName"
                    value={formData.formerName}
                    onChange={handleChange}
                    placeholder="如有曾用名请填写"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    性别 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    是否健在
                  </label>
                  <select
                    name="isAlive"
                    value={formData.isAlive}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="是">是</option>
                    <option value="否">否</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  出生地
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder="例如：北京市朝阳区"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* 出生日期 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公历出生日期 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="solarDate"
                    value={formData.solarDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    农历出生日期
                  </label>
                  <input
                    type="text"
                    name="lunarDate"
                    value={formData.lunarDate}
                    onChange={handleChange}
                    placeholder="例如：甲子年正月初一"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出生时间 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    当前年份
                  </label>
                  <input
                    type="number"
                    name="currentYear"
                    value={formData.currentYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  你想问什么？
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="例如：事业发展、感情问题、人生方向..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-text-primary text-white rounded-lg font-medium text-lg hover:bg-text-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    AI 酋长正在为你解读...
                  </span>
                ) : (
                  "🔮 开始测一测"
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                💡 AI 测试仅供娱乐参考，真正的命运掌握在你自己手中
              </p>
            </div>
          </div>
        ) : (
          /* Result */
          <div className="bg-white rounded-lg border border-border p-8">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1.5">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1.5">{children}</ol>,
                  li: ({ children }) => <li className="ml-2 text-gray-700">{children}</li>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 mb-3 mt-5">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">{children}</h3>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-purple-600">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto mb-3">
                        {children}
                      </code>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 pl-4 py-2 mb-3 text-gray-600 italic">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {result}
              </ReactMarkdown>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setResult("");
                  setFormData({
                    name: "",
                    formerName: "",
                    gender: "",
                    isAlive: "是",
                    birthPlace: "",
                    solarDate: "",
                    lunarDate: "",
                    birthTime: "",
                    currentYear: new Date().getFullYear().toString(),
                    question: "",
                  });
                }}
                className="flex-1 py-3 border-2 border-text-primary text-text-primary rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                再测一次
              </button>
              <a
                href="https://github.com/AIPMAndy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-text-primary text-white rounded-lg font-medium text-center hover:bg-text-secondary transition-all"
              >
                查看更多项目
              </a>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-medium text-gray-900 mb-2">精准洞察</h3>
            <p className="text-sm text-gray-600">
              结合传统命理与 AI 分析
            </p>
          </div>
          <div className="bg-white border border-border rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-medium text-gray-900 mb-2">实用建议</h3>
            <p className="text-sm text-gray-600">
              不只是预测，更给出行动方案
            </p>
          </div>
          <div className="bg-white border border-border rounded-lg p-6 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-medium text-gray-900 mb-2">隐私保护</h3>
            <p className="text-sm text-gray-600">
              你的信息仅用于本次测试
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
