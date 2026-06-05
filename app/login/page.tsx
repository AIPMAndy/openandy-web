"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUserProfile } from "@/lib/storage";
import { useLocale } from "@/contexts/LocaleContext";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      saveUserProfile({
        name: "User",
        avatar: "👨‍💻",
        isLoggedIn: true,
      });
      router.push("/");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-white border border-border flex items-center justify-center text-4xl mx-auto mb-4">
            🎯
          </div>
          <h1 className="text-2xl font-light text-text-primary mb-2">
            {t.login.title}
          </h1>
          <p className="text-sm text-text-muted">{t.login.subtitle}</p>
        </div>

        <div className="bg-white border border-border p-6 mb-8">
          <h2 className="text-base font-normal text-text-primary mb-4">
            {t.login.features.title}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔮</span>
              <div>
                <p className="text-sm text-text-primary">{t.login.features.reading.title}</p>
                <p className="text-xs text-text-muted">{t.login.features.reading.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">💬</span>
              <div>
                <p className="text-sm text-text-primary">{t.login.features.chat.title}</p>
                <p className="text-xs text-text-muted">{t.login.features.chat.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div>
                <p className="text-sm text-text-primary">{t.login.features.personalized.title}</p>
                <p className="text-xs text-text-muted">{t.login.features.personalized.desc}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-4 bg-text-primary text-white rounded-2xl text-sm font-normal hover:bg-text-secondary transition-colors disabled:opacity-50"
        >
          {isLoading ? t.login.loginBtnLoading : t.login.loginBtn}
        </button>

        <p className="text-xs text-text-muted text-center mt-6 leading-relaxed">
          {t.login.agreement}
          <a href="#" className="text-text-secondary underline">
            {t.login.terms}
          </a>
          {t.login.and}
          <a href="#" className="text-text-secondary underline">
            {t.login.privacy}
          </a>
        </p>
      </div>
    </div>
  );
}
