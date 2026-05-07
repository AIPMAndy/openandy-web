"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCheckinRecords,
  isCheckedToday,
  getContinuousDays,
  generateSampleRecords,
  CheckinRecord,
} from "@/lib/storage";
import CheckinModal from "@/components/CheckinModal";

export default function CheckinPage() {
  const [records, setRecords] = useState<CheckinRecord[]>([]);
  const [checked, setChecked] = useState(false);
  const [continuousDays, setContinuousDays] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    generateSampleRecords();
    loadData();
  }, []);

  const loadData = () => {
    const allRecords = getCheckinRecords();
    setRecords(allRecords);
    setChecked(isCheckedToday());
    setContinuousDays(getContinuousDays());
  };

  const handleCheckinSuccess = () => {
    setShowModal(false);
    loadData();
  };

  const getCalendarDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const checkedDates = new Set(records.map((r) => r.date));

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-white px-5 pt-14 pb-6 border-b border-border">
        <h1 className="text-2xl font-light text-text-primary mb-1">学习打卡</h1>
        <p className="text-sm text-text-muted">坚持学习，每天进步一点点</p>
      </header>

      <div className="px-5 py-4">
        <div className="bg-white border border-border p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{checked ? "✅" : "⭕"}</span>
                <span className="text-lg font-normal text-text-primary">
                  今日{checked ? "已" : "未"}打卡
                </span>
              </div>
              <p className="text-sm text-text-muted">
                连续打卡 <span className="text-text-primary font-normal">{continuousDays}</span> 天
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              disabled={checked}
              className={`px-6 py-2.5 rounded-2xl text-sm transition-colors ${
                checked
                  ? "bg-bg text-text-muted cursor-not-allowed"
                  : "bg-text-primary text-white hover:bg-text-secondary"
              }`}
            >
              立即打卡
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["一", "二", "三", "四", "五", "六", "日"].map((day) => (
              <div
                key={day}
                className="text-center text-xs text-text-muted py-1"
              >
                {day}
              </div>
            ))}
            {getCalendarDays().map((date) => (
              <div
                key={date}
                className={`text-center text-xs py-1.5 ${
                  checkedDates.has(date)
                    ? "bg-text-primary text-white"
                    : "text-text-muted"
                }`}
              >
                {new Date(date).getDate()}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-base font-normal text-text-primary mb-3">
            学习记录
          </h2>
          {records.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-sm">还没有学习记录</p>
              <p className="text-xs mt-1">开始打卡记录你的学习吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  className="bg-white border border-border p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-normal text-text-primary">
                      {record.projectName}
                    </span>
                    <span className="text-xs text-text-muted">{record.date}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {record.content}
                  </p>
                  <div className="flex gap-1.5">
                    {record.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-bg text-text-muted border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CheckinModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleCheckinSuccess}
      />
    </div>
  );
}
