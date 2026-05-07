"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveUserProfile } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      saveUserProfile({
        name: "学习者",
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
            醒觉AI学习打卡
          </h1>
          <p className="text-sm text-text-muted">AI酋长Andy 出品</p>
        </div>

        <div className="bg-white border border-border p-6 mb-8">
          <h2 className="text-base font-normal text-text-primary mb-4">
            核心功能
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔍</span>
              <div>
                <p className="text-sm text-text-primary">发现优质AI项目</p>
                <p className="text-xs text-text-muted">精选15+开源AI项目推荐</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📝</span>
              <div>
                <p className="text-sm text-text-primary">记录学习打卡</p>
                <p className="text-xs text-text-muted">每日学习内容记录与分享</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <div>
                <p className="text-sm text-text-primary">统计学习数据</p>
                <p className="text-xs text-text-muted">可视化学习进度与成果</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full py-4 bg-text-primary text-white rounded-2xl text-sm font-normal hover:bg-text-secondary transition-colors disabled:opacity-50"
        >
          {isLoading ? "登录中..." : "微信授权登录"}
        </button>

        <p className="text-xs text-text-muted text-center mt-6 leading-relaxed">
          登录即表示同意
          <a href="#" className="text-text-secondary underline">
            《用户协议》
          </a>
          和
          <a href="#" className="text-text-secondary underline">
            《隐私政策》
          </a>
        </p>
      </div>
    </div>
  );
}
