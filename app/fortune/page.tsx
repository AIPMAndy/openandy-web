"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";
import { useLocale } from "@/contexts/LocaleContext";

type PackageType = "basic" | "premium" | "vip" | null;
type Step = "package" | "payment" | "form" | "loading" | "result";

function FortuneContent() {
  const searchParams = useSearchParams();
  const { t, locale } = useLocale();

  const packages = {
    basic: {
      name: t.home.pricing.basic.name,
      price: locale === 'en' ? 49 : 299,
      features: t.home.pricing.basic.features,
    },
    premium: {
      name: t.home.pricing.premium.name,
      price: locale === 'en' ? 149 : 999,
      features: t.home.pricing.premium.features,
    },
    vip: {
      name: t.home.pricing.vip.name,
      price: locale === 'en' ? 499 : 2999,
      features: t.home.pricing.vip.features,
    },
  };

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
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data.result);
      setStep("result");
    } catch (error) {
      console.error("Fortune API error:", error);
      setResult(`${t.fortune.error.title}

${t.fortune.error.sorry}

${t.fortune.error.reasons}
${t.fortune.error.reason1}
${t.fortune.error.reason2}
${t.fortune.error.reason3}

${t.fortune.error.suggestions}
${t.fortune.error.suggestion1}
${t.fortune.error.suggestion2}

${t.fortune.error.contact}`);
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
            {t.fortune.title}
          </h1>
          <p className="text-ink-light">
            {t.fortune.subtitle}
          </p>
        </div>

        {/* Step 1: Package Selection */}
        {step === "package" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              {t.fortune.selectPackage}
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
                    {t.common.currency}{pkg.price}
                  </div>
                  <ul className="space-y-2 mb-6 text-ink-light text-sm">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full btn-primary">
                    {key === 'vip' ? t.home.pricing.vip.cta : t.home.pricing.basic.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === "payment" && selectedPackage && (
          <div className="card-oriental p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t.fortune.payment.title}
            </h2>
            <div className="mb-6 p-4 bg-paper rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-ink-light">{t.fortune.payment.package}</span>
                <span className="font-semibold">
                  {packages[selectedPackage].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light">{t.fortune.payment.amount}</span>
                <span className="text-2xl font-bold text-gold">
                  {t.common.currency}{packages[selectedPackage].price}
                </span>
              </div>
            </div>

            <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-green-800 mb-2 font-semibold">
                {t.fortune.payment.devNotice}
              </p>
              <p className="text-xs text-green-700">
                {t.fortune.payment.devDesc}
              </p>
            </div>

            <div className="mb-6 p-6 bg-ink-lighter/20 rounded-lg text-center">
              <p className="text-sm text-ink-light mb-4">
                {t.fortune.payment.willSupport}
              </p>
              <div className="w-48 h-48 mx-auto bg-white border-2 border-ink-lighter rounded-lg flex items-center justify-center">
                <span className="text-ink-light">{t.fortune.payment.title}</span>
              </div>
              <p className="text-xs text-ink-light mt-4">
                {t.fortune.payment.paymentMethods}
              </p>
            </div>

            <button
              onClick={handlePaymentComplete}
              className="w-full btn-primary mb-3"
            >
              {t.fortune.payment.continueBtn}
            </button>
            <button
              onClick={() => setStep("package")}
              className="w-full btn-secondary"
            >
              {t.fortune.payment.backBtn}
            </button>
          </div>
        )}

        {/* Step 3: Form */}
        {step === "form" && (
          <div className="card-oriental p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t.fortune.form.title}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    {t.fortune.form.name} <span className="text-cinnabar">{t.fortune.form.required}</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.fortune.form.namePlaceholder}
                    className="input-oriental"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    {t.fortune.form.gender} <span className="text-cinnabar">{t.fortune.form.required}</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="input-oriental"
                    required
                  >
                    <option value="">{t.fortune.form.genderSelect}</option>
                    <option value="male">{t.fortune.form.male}</option>
                    <option value="female">{t.fortune.form.female}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    {t.fortune.form.birthDate} <span className="text-cinnabar">{t.fortune.form.required}</span>
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
                    {t.fortune.form.birthTime} <span className="text-cinnabar">{t.fortune.form.required}</span>
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
                  {t.fortune.form.birthPlace}
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder={t.fortune.form.birthPlacePlaceholder}
                  className="input-oriental"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  {t.fortune.form.question}
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder={t.fortune.form.questionPlaceholder}
                  rows={4}
                  className="input-oriental resize-none"
                />
              </div>

              <button type="submit" className="w-full btn-primary text-lg py-4">
                {t.fortune.form.submitBtn}
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
              {t.fortune.loading.title}
            </p>
            <p className="text-sm text-ink-light mb-6">
              {t.fortune.loading.estimate}
            </p>
            <div className="max-w-md mx-auto space-y-2 text-xs text-ink-light">
              <p className="animate-pulse">{t.fortune.loading.step1}</p>
              <p className="animate-pulse delay-300">{t.fortune.loading.step2}</p>
              <p className="animate-pulse delay-500">{t.fortune.loading.step3}</p>
            </div>
          </div>
        )}

        {/* Step 5: Result */}
        {step === "result" && (
          <div className="space-y-8">
            <div className="card-oriental p-8">
              <h2 className="title-oriental text-2xl font-bold mb-6 text-center">
                {t.fortune.result.title}
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
                {t.fortune.result.ctaTitle}
              </h3>
              <p className="text-ink-light mb-6">
                {t.fortune.result.ctaDesc}
              </p>

              <div className="max-w-md mx-auto mb-6">
                <div className="bg-paper p-6 rounded-lg border border-ink-lighter">
                  <p className="text-sm text-ink mb-3 font-semibold">
                    {t.fortune.result.qrTitle}
                  </p>
                  <p className="text-xs text-ink-light mb-4">
                    {t.fortune.result.qrDesc}
                  </p>
                  <div className="space-y-2">
                    <a
                      href="mailto:andy@aipm.io"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-ink text-white rounded-lg hover:bg-ink-light transition-colors"
                    >
                      <span>📧</span>
                      <span className="text-sm">andy@aipm.io</span>
                    </a>
                    {locale === 'zh' && (
                      <div className="w-48 h-48 mx-auto bg-ink-lighter/20 border-2 border-ink-lighter rounded-lg flex items-center justify-center">
                        <span className="text-xs text-ink-light text-center px-4">Andy 企业微信二维码<br/>（开发中）</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-paper p-6 rounded-lg mb-6 text-left">
                <p className="font-semibold mb-3">{t.fortune.result.benefits.title}</p>
                <ul className="space-y-2 text-sm text-ink-light">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{t.fortune.result.benefits.item1}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{t.fortune.result.benefits.item2}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{t.fortune.result.benefits.item3}</span>
                  </li>
                </ul>
              </div>

              <button className="btn-primary mb-3">
                {t.fortune.result.bookBtn}
              </button>
              <p className="text-xs text-ink-light">
                {t.fortune.result.testimonial}
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
                {t.fortune.result.retryBtn}
              </button>
              <a
                href="/"
                className="flex-1 btn-primary text-center"
              >
                {t.fortune.result.homeBtn}
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
          <p className="text-ink-light">Loading...</p>
        </div>
      </div>
    }>
      <FortuneContent />
    </Suspense>
  );
}
