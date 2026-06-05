"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";

const AUTH_CODE_KEY = "openandy_auth_code";
const VALID_CODES = ["AIAndy2026", "OpenAndy", "Juexing"];

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { t } = useLocale();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_CODE_KEY);
    if (saved && VALID_CODES.includes(saved)) {
      setIsAuthorized(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_CODES.includes(code.trim())) {
      localStorage.setItem(AUTH_CODE_KEY, code.trim());
      setIsAuthorized(true);
      setError("");
    } else {
      setError(t.auth.errorInvalid);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-muted">{t.auth.checking}</div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="bg-white border border-border rounded-lg p-8">
            <div className="text-center mb-6">
              <span className="text-4xl mb-4 block">🔐</span>
              <h2 className="text-xl font-medium text-text-primary mb-2">
                {t.auth.title}
              </h2>
              <p className="text-sm text-text-muted">
                {t.auth.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  placeholder={t.auth.placeholder}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-text-muted"
                  autoFocus
                />
                {error && (
                  <p className="text-xs text-red-500 mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-text-primary text-white rounded-lg text-sm font-medium hover:bg-text-secondary transition-colors"
              >
                {t.auth.unlockBtn}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-text-muted text-center">
                {t.auth.noCode} {t.auth.contact}: <span className="font-medium">{t.auth.contactValue}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
