import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";

export const metadata: Metadata = {
  title: "AI Chief Andy - AI-Powered Strategic Insights | AI 酋长",
  description: "Combining ancient wisdom with AI intelligence for strategic decision-making. Trusted by 100+ business leaders. 东方智慧与 AI 结合的决策系统。",
  keywords: "AI insights, strategic consulting, business intelligence, decision-making, I Ching, AI Chief Andy, 天机测算, 决策咨询",
  openGraph: {
    title: "AI Chief Andy - AI-Powered Strategic Insights",
    description: "Ancient wisdom meets AI intelligence for strategic decision-making",
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" hrefLang="en" href="https://openandy.vercel.app/" />
        <link rel="alternate" hrefLang="zh" href="https://openandy.vercel.app/?lang=zh" />
        <link rel="alternate" hrefLang="x-default" href="https://openandy.vercel.app/" />
      </head>
      <body className="bg-bg text-text-primary min-h-screen">
        <LocaleProvider>
          <main>{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
