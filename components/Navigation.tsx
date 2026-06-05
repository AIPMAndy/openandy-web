"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";

export default function Navigation() {
  const pathname = usePathname();
  const { locale, t, setLocale } = useLocale();

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/fortune", label: t.nav.fortune },
    { href: "/chat", label: t.nav.chat },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-ink-lighter/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-ink">
              {locale === 'en' ? 'AI Chief Andy' : 'AI 酋长 Andy'}
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href
                    ? "text-cinnabar font-semibold"
                    : "text-ink-light hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4 border-l border-ink-lighter pl-4">
              <button
                onClick={() => setLocale('zh')}
                className={`text-sm transition-colors ${
                  locale === 'zh'
                    ? 'text-cinnabar font-semibold'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                中文
              </button>
              <span className="text-ink-lighter">|</span>
              <button
                onClick={() => setLocale('en')}
                className={`text-sm transition-colors ${
                  locale === 'en'
                    ? 'text-cinnabar font-semibold'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
