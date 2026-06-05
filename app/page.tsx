"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useLocale } from "@/contexts/LocaleContext";

export default function HomePage() {
  const { t, locale } = useLocale();

  return (
    <div className="min-h-screen bg-paper">
      <Navigation />
      {/* Hero Section */}
      <section className="relative bg-ink-gradient py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 ink-wash opacity-30"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="title-oriental text-5xl md:text-6xl font-bold mb-6 text-paper">
            {t.home.title}
          </h1>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-paper/90">
            {t.home.subtitle}
          </h2>
          <p className="text-xl text-paper/80 mb-8 max-w-2xl mx-auto">
            {t.home.description}
          </p>
          <Link
            href="/fortune"
            className="inline-block btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl"
          >
            {t.home.cta}
          </Link>
          <p className="mt-6 text-sm text-paper/60">
            {t.home.testimonial}
          </p>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card-oriental p-8 text-center hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">📜</div>
              <h3 className="title-oriental text-2xl font-semibold mb-3">
                {t.home.valueProps.wisdom.title}
              </h3>
              <p className="text-ink-light leading-relaxed mb-2">
                {t.home.valueProps.wisdom.desc1}
              </p>
              <p className="text-ink-light leading-relaxed">
                {t.home.valueProps.wisdom.desc2}
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-oriental p-8 text-center hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="title-oriental text-2xl font-semibold mb-3">
                {t.home.valueProps.ai.title}
              </h3>
              <p className="text-ink-light leading-relaxed mb-2">
                {t.home.valueProps.ai.desc1}
              </p>
              <p className="text-ink-light leading-relaxed">
                {t.home.valueProps.ai.desc2}
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-oriental p-8 text-center hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="title-oriental text-2xl font-semibold mb-3">
                {t.home.valueProps.exclusive.title}
              </h3>
              <p className="text-ink-light leading-relaxed mb-2">
                {t.home.valueProps.exclusive.desc1}
              </p>
              <p className="text-ink-light leading-relaxed">
                {t.home.valueProps.exclusive.desc2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="title-oriental text-4xl font-bold text-center mb-4">
            {t.home.pricing.title}
          </h2>
          <p className="text-center text-ink-light mb-12">
            {t.home.pricing.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="card-oriental p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-2">{t.home.pricing.basic.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold">
                  {t.common.currency}{locale === 'en' ? '49' : '299'}
                </span>
              </div>
              <ul className="space-y-3 mb-8 text-ink-light">
                {t.home.pricing.basic.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/fortune?package=basic"
                className="block w-full btn-secondary text-center"
              >
                {t.home.pricing.basic.cta}
              </Link>
            </div>

            {/* Premium Package */}
            <div className="card-oriental p-8 hover:shadow-lg transition-shadow border-2 border-cinnabar relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cinnabar text-white px-4 py-1 rounded-full text-sm">
                {t.home.pricing.premium.badge}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t.home.pricing.premium.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold">
                  {t.common.currency}{locale === 'en' ? '149' : '999'}
                </span>
              </div>
              <ul className="space-y-3 mb-8 text-ink-light">
                {t.home.pricing.premium.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/fortune?package=premium"
                className="block w-full btn-primary text-center"
              >
                {t.home.pricing.premium.cta}
              </Link>
            </div>

            {/* VIP Package */}
            <div className="card-oriental p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-2">{t.home.pricing.vip.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold">
                  {t.common.currency}{locale === 'en' ? '499' : '2999'}
                </span>
              </div>
              <ul className="space-y-3 mb-8 text-ink-light">
                {t.home.pricing.vip.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/fortune?package=vip"
                className="block w-full btn-secondary text-center"
              >
                {t.home.pricing.vip.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-ink-lighter">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-ink-light mb-4">
            {t.home.footer.copyright}
          </p>
          <div className="flex justify-center gap-6 text-sm text-ink-light">
            <Link href="/chat" className="hover:text-ink transition-colors">
              {t.home.footer.aiChat}
            </Link>
            <a
              href="https://github.com/AIPMAndy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:andy@aipm.io"
              className="hover:text-ink transition-colors"
            >
              {t.common.email}: andy@aipm.io
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
