import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Open Andy Web - AI学习Hub",
  description: "AI酋长Andy的AI学习平台 - 发现优质AI项目，记录学习打卡",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-bg text-text-primary min-h-screen">
        <Nav />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
