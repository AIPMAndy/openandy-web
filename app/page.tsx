"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="relative bg-ink-gradient py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 ink-wash opacity-30"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="title-oriental text-5xl md:text-6xl font-bold mb-6 text-paper">
            AI 酋长
          </h1>
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-paper/90">
            东方智慧决策系统
          </h2>
          <p className="text-xl text-paper/80 mb-8 max-w-2xl mx-auto">
            千年智慧，AI 赋能，为决策者而生
          </p>
          <Link
            href="/fortune"
            className="inline-block btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl"
          >
            开始测算
          </Link>
          <p className="mt-6 text-sm text-paper/60">
            已为 100+ 企业家提供决策洞察
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
                东方智慧传承
              </h3>
              <p className="text-ink-light leading-relaxed mb-2">
                融合易经、命理、风水
              </p>
              <p className="text-ink-light leading-relaxed">
                千年智慧的现代诠释
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-oriental p-8 text-center hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="title-oriental text-2xl font-semibold mb-3">
                AI 科技赋能
              </h3>
              <p className="text-ink-light leading-relaxed mb-2">
                深度分析、精准洞察
              </p>
              <p className="text-ink-light leading-relaxed">
                大数据驱动的智能系统
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-oriental p-8 text-center hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="title-oriental text-2xl font-semibold mb-3">
                决策者专属
              </h3>
              <p className="text-ink-light leading-relaxed mb-2">
                CEO、企业家定制
              </p>
              <p className="text-ink-light leading-relaxed">
                高端人群的私人智囊
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="title-oriental text-4xl font-bold text-center mb-4">
            服务套餐
          </h2>
          <p className="text-center text-ink-light mb-12">
            选择适合您的决策辅助方案
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="card-oriental p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-2">基础测算</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold">¥299</span>
              </div>
              <ul className="space-y-3 mb-8 text-ink-light">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>AI 自动生成</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>基础洞察</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>文字报告</span>
                </li>
              </ul>
              <Link
                href="/fortune?package=basic"
                className="block w-full btn-secondary text-center"
              >
                立即测算
              </Link>
            </div>

            {/* Premium Package */}
            <div className="card-oriental p-8 hover:shadow-lg transition-shadow border-2 border-cinnabar relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cinnabar text-white px-4 py-1 rounded-full text-sm">
                推荐
              </div>
              <h3 className="text-2xl font-semibold mb-2">深度解读</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold">¥999</span>
              </div>
              <ul className="space-y-3 mb-8 text-ink-light">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>AI 深度分析</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>专家点评</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>PDF 报告</span>
                </li>
              </ul>
              <Link
                href="/fortune?package=premium"
                className="block w-full btn-primary text-center"
              >
                立即测算
              </Link>
            </div>

            {/* VIP Package */}
            <div className="card-oriental p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-2">至尊咨询</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold">¥2999</span>
              </div>
              <ul className="space-y-3 mb-8 text-ink-light">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Andy 亲自解读</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>1对1 咨询</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>定制方案</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>长期跟踪</span>
                </li>
              </ul>
              <Link
                href="/fortune?package=vip"
                className="block w-full btn-secondary text-center"
              >
                立即预约
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-ink-lighter">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-ink-light mb-4">
            © 2026 AI 酋长 Andy · 东方智慧决策系统
          </p>
          <div className="flex justify-center gap-6 text-sm text-ink-light">
            <Link href="/chat" className="hover:text-ink transition-colors">
              AI 对话
            </Link>
            <a
              href="https://github.com/AIPMAndy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
            <span>微信：AI PMAndy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
