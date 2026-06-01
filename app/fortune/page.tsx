"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";

type PackageType = "basic" | "premium" | "vip" | null;
type Step = "package" | "payment" | "form" | "loading" | "result";

const packages = {
  basic: {
    name: "基础测算",
    price: 299,
    features: ["AI 自动生成", "基础洞察", "文字报告"],
  },
  premium: {
    name: "深度解读",
    price: 999,
    features: ["AI 深度分析", "专家点评", "PDF 报告"],
  },
  vip: {
    name: "至尊咨询",
    price: 2999,
    features: ["Andy 亲自解读", "1对1 咨询", "定制方案", "长期跟踪"],
  },
};

function FortuneContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("package");
  const [selectedPackage, setSelectedPackage] = useState<PackageType>(null);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    question: "",
  });
  const [result, setResult] = useState("");

  useEffect(() => {
    const pkg = searchParams.get("package") as PackageType;
    if (pkg && packages[pkg]) {
      setSelectedPackage(pkg);
      setStep("payment");
    }
  }, [searchParams]);

  const handlePackageSelect = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    setStep("form");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");

    try {
      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          solarDate: formData.birthDate,
          package: selectedPackage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "测算失败");
      }

      setResult(data.result);
      setStep("result");
    } catch (error) {
      console.error("Fortune API error:", error);
      setResult(`## ❌ 服务暂时不可用

很抱歉，测算服务遇到了问题。

**可能的原因：**
- 服务器正在维护
- 网络连接不稳定
- API 配额已用完

**建议：**
- 请稍后再试
- 或直接联系 Andy 进行人工咨询

如需帮助，请添加 Andy 企业微信。`);
      setStep("result");
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <Navigation />
      <div className="max-w-4xl mx-auto py-12 px-6 pt-32">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="title-oriental text-4xl font-bold mb-3">
            天机测算
          </h1>
          <p className="text-ink-light">
            融合东方智慧与 AI 洞察，为您的重大决策提供指引
          </p>
        </div>

        {/* Step 1: Package Selection */}
        {step === "package" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              选择您的服务套餐
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(packages).map(([key, pkg]) => (
                <div
                  key={key}
                  className="card-oriental p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePackageSelect(key as PackageType)}
                >
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gold mb-4">
                    ¥{pkg.price}
                  </div>
                  <ul className="space-y-2 mb-6 text-ink-light text-sm">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full btn-primary">选择此套餐</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === "payment" && selectedPackage && (
          <div className="card-oriental p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              确认订单
            </h2>
            <div className="mb-6 p-4 bg-paper rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-ink-light">套餐</span>
                <span className="font-semibold">
                  {packages[selectedPackage].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">金额</span>
                <span className="text-2xl font-bold text-gold">
                  ¥{packages[selectedPackage].price}
                </span>
              </div>
            </div>

            <div className="mb-6 p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <p className="text-sm text-amber-800 mb-2 font-semibold">
                ⚠️ 开发阶段 - 模拟支付
              </p>
              <p className="text-xs text-amber-700">
                当前为产品测试阶段，支付功能尚未开通
              </p>
            </div>

            <div className="mb-6 p-6 bg-ink-lighter/20 rounded-lg text-center">
              <p className="text-sm text-ink-light mb-4">
                正式上线后将支持
              </p>
              <div className="w-48 h-48 mx-auto bg-white border-2 border-ink-lighter rounded-lg flex items-center justify-center">
                <span className="text-ink-light">支付二维码</span>
              </div>
              <p className="text-xs text-ink-light mt-4">
                支付宝 / 微信支付 / 企业转账
              </p>
            </div>

            <button
              onClick={handlePaymentComplete}
              className="w-full btn-primary mb-3"
            >
              继续体验（跳过支付）
            </button>
            <button
              onClick={() => setStep("package")}
              className="w-full btn-secondary"
            >
              返回选择套餐
            </button>
          </div>
        )}

        {/* Step 3: Form */}
        {step === "form" && (
          <div className="card-oriental p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              填写您的信息
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    姓名 <span className="text-cinnabar">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="请输入姓名"
                    className="input-oriental"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    性别 <span className="text-cinnabar">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-oriental"
                    required
                  >
                    <option value="">请选择</option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    出生日期 <span className="text-cinnabar">*</span>
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="input-oriental"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    出生时间 <span className="text-cinnabar">*</span>
                  </label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    className="input-oriental"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  出生地（选填）
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder="例如：北京市"
                  className="input-oriental"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  您当前面临的问题或决策
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="例如：事业发展方向、重大投资决策、人生规划..."
                  rows={4}
                  className="input-oriental resize-none"
                />
              </div>

              <button type="submit" className="w-full btn-primary text-lg py-4">
                开始测算
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Loading */}
        {step === "loading" && (
          <div className="card-oriental p-12 text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 animate-spin w-24 h-24 border-4 border-ink-lighter border-t-cinnabar rounded-full"></div>
              <div className="absolute inset-2 animate-pulse w-20 h-20 border-2 border-gold/30 rounded-full"></div>
            </div>
            <p className="text-2xl font-semibold text-ink mb-3">
              AI 酋长正在为您解读天机...
            </p>
            <p className="text-sm text-ink-light mb-6">
              预计需要 30-60 秒
            </p>
            <div className="max-w-md mx-auto space-y-2 text-xs text-ink-light">
              <p className="animate-pulse">📊 分析生辰八字...</p>
              <p className="animate-pulse delay-300">🔮 推演命理格局...</p>
              <p className="animate-pulse delay-500">✨ 生成决策建议...</p>
            </div>
          </div>
        )}

        {/* Step 5: Result */}
        {step === "result" && (
          <div className="space-y-8">
            <div className="card-oriental p-8">
              <h2 className="title-oriental text-2xl font-bold mb-6 text-center">
                您的天机测算结果
              </h2>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 text-ink-light leading-relaxed">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-ink">
                        {children}
                      </strong>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold text-ink mb-3 mt-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold text-ink mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-3 space-y-1.5">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="ml-2 text-ink-light">{children}</li>
                    ),
                  }}
                >
                  {result}
                </ReactMarkdown>
              </div>
            </div>

            {/* Referral Section */}
            <div className="card-oriental p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                想要更深入的解读？
              </h3>
              <p className="text-ink-light mb-6">
                AI 测算只是开始，真正的智慧在于深度对话
              </p>

              <div className="max-w-md mx-auto mb-6">
                <div className="w-48 h-48 mx-auto bg-ink-lighter/20 border-2 border-ink-lighter rounded-lg flex items-center justify-center mb-4">
                  <span className="text-ink-light">Andy 企业微信二维码</span>
                </div>
                <p className="text-sm text-ink-light mb-2">
                  <strong>AI 酋长 Andy</strong>
                </p>
                <p className="text-xs text-ink-light">
                  10+ 年企业家决策顾问经验
                </p>
              </div>

              <div className="bg-paper p-6 rounded-lg mb-6 text-left">
                <p className="font-semibold mb-3">Andy 亲自为您：</p>
                <ul className="space-y-2 text-sm text-ink-light">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>深度解读测算结果背后的玄机</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>结合您的实际情况提供定制建议</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>长期跟踪指导，助您把握关键决策</span>
                  </li>
                </ul>
              </div>

              <button className="btn-primary mb-3">
                预约深度咨询
              </button>
              <p className="text-xs text-ink-light">
                已有 50+ 企业家通过深度咨询获得突破
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setStep("package");
                  setSelectedPackage(null);
                  setFormData({
                    name: "",
                    gender: "",
                    birthDate: "",
                    birthTime: "",
                    birthPlace: "",
                    question: "",
                  });
                  setResult("");
                }}
                className="flex-1 btn-secondary"
              >
                再测一次
              </button>
              <a
                href="/"
                className="flex-1 btn-primary text-center"
              >
                返回首页
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FortunePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-ink-lighter border-t-cinnabar rounded-full mx-auto mb-4"></div>
          <p className="text-ink-light">加载中...</p>
        </div>
      </div>
    }>
      <FortuneContent />
    </Suspense>
  );
}
