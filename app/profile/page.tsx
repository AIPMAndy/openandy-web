"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useLocale } from "@/contexts/LocaleContext";

export default function ProfilePage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-bg">
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 py-20 pt-32">
        {/* Profile Header */}
        <div className="bg-white border border-border p-8 rounded-lg text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cinnabar to-gold flex items-center justify-center text-5xl border-4 border-paper shadow-lg">
            👤
          </div>
          <h1 className="text-2xl font-normal text-text-primary mb-2">
            {t.profile.title}
          </h1>
          <p className="text-sm text-text-muted">
            {t.profile.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Link
            href="/fortune"
            className="bg-white border border-border p-6 rounded-lg hover:border-text-muted hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔮</span>
              <div>
                <h3 className="text-lg font-normal text-text-primary mb-1">
                  {t.profile.services.fortune}
                </h3>
                <p className="text-sm text-text-muted">
                  {t.profile.services.fortuneDesc}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/chat"
            className="bg-white border border-border p-6 rounded-lg hover:border-text-muted hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">💬</span>
              <div>
                <h3 className="text-lg font-normal text-text-primary mb-1">
                  {t.profile.services.chat}
                </h3>
                <p className="text-sm text-text-muted">
                  {t.profile.services.chatDesc}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Contact Section */}
        <div className="bg-white border border-border p-6 rounded-lg">
          <h2 className="text-lg font-normal text-text-primary mb-4">
            {t.profile.contact.title}
          </h2>
          <div className="space-y-3">
            <a
              href="mailto:andy@aipm.io"
              className="flex items-center gap-3 p-3 bg-bg rounded hover:bg-text-muted/10 transition-colors"
            >
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-sm font-normal text-text-primary">{t.common.email}</p>
                <p className="text-xs text-text-muted">andy@aipm.io</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
