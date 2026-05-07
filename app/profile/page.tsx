"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCheckinRecords,
  getContinuousDays,
  getUserProfile,
  generateSampleRecords,
  CheckinRecord,
  UserProfile,
} from "@/lib/storage";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "学习者",
    avatar: "👨‍💻",
    isLoggedIn: false,
  });
  const [records, setRecords] = useState<CheckinRecord[]>([]);
  const [continuousDays, setContinuousDays] = useState(0);

  useEffect(() => {
    generateSampleRecords();
    setProfile(getUserProfile());
    setRecords(getCheckinRecords());
    setContinuousDays(getContinuousDays());
  }, []);

  const totalDays = new Set(records.map((r) => r.date)).size;

  const featureGrid = [
    { icon: "📅", label: "我的打卡", href: "/checkin" },
    { icon: "📝", label: "学习记录", href: "/checkin" },
    { icon: "📊", label: "学习统计", href: "#" },
    { icon: "⚙️", label: "设置", href: "#" },
  ];

  const getTagStats = () => {
    const tagCount: Record<string, number> = {};
    records.forEach((r) => {
      r.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const tagStats = getTagStats();
  const maxCount = tagStats.length > 0 ? tagStats[0][1] : 1;

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-bg flex items-center justify-center text-3xl border border-border">
              {profile.avatar}
            </div>
            <div>
              <h1 className="text-xl font-normal text-text-primary">
                {profile.name}
              </h1>
              <p className="text-sm text-text-muted mt-0.5">
                {profile.isLoggedIn ? "已登录" : "点击登录"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-border p-4 rounded-lg text-center">
            <p className="text-2xl font-light text-text-primary">{totalDays}</p>
            <p className="text-xs text-text-muted mt-1">打卡天数</p>
          </div>
          <div className="bg-white border border-border p-4 rounded-lg text-center">
            <p className="text-2xl font-light text-text-primary">
              {continuousDays}
            </p>
            <p className="text-xs text-text-muted mt-1">连续天数</p>
          </div>
          <div className="bg-white border border-border p-4 rounded-lg text-center">
            <p className="text-2xl font-light text-text-primary">
              {records.length}
            </p>
            <p className="text-xs text-text-muted mt-1">学习记录</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {featureGrid.map((feature) => (
            <Link
              key={feature.label}
              href={feature.href}
              className="bg-white border border-border p-4 rounded-lg text-center hover:border-text-muted hover:shadow-sm transition-all"
            >
              <span className="text-2xl block mb-1">{feature.icon}</span>
              <span className="text-xs text-text-secondary">{feature.label}</span>
            </Link>
          ))}
        </div>

        {/* Learning Data */}
        <div className="bg-white border border-border p-5 rounded-lg mb-6">
          <h2 className="text-base font-normal text-text-primary mb-4">
            学习数据
          </h2>
          {tagStats.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-4">
              暂无学习数据
            </p>
          ) : (
            <div className="space-y-3">
              {tagStats.map(([tag, count]) => (
                <div key={tag} className="flex items-center gap-3">
                  <span className="text-xs text-text-muted w-16 text-right">
                    {tag}
                  </span>
                  <div className="flex-1 bg-bg h-4 overflow-hidden rounded">
                    <div
                      className="bg-text-primary h-full transition-all rounded"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-muted w-8">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-border p-5 rounded-lg">
          <h2 className="text-base font-normal text-text-primary mb-3">
            最近活动
          </h2>
          {records.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-4">
              暂无活动记录
            </p>
          ) : (
            <div className="space-y-3">
              {records.slice(0, 3).map((record) => (
                <div
                  key={record.id}
                  className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-full bg-bg flex items-center justify-center text-sm flex-shrink-0">
                    📝
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary">
                      打卡了 <span className="font-normal">{record.projectName}</span>
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{record.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
