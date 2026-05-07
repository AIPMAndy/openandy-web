"use client";

import { useState } from "react";
import { projects } from "@/lib/projects";
import { templates } from "@/lib/templates";
import { addCheckinRecord, CheckinRecord } from "@/lib/storage";

interface CheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckinModal({ isOpen, onClose, onSuccess }: CheckinModalProps) {
  const [selectedProject, setSelectedProject] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [step, setStep] = useState<"template" | "form">("template");

  if (!isOpen) return null;

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (template && template.prompts.length > 0) {
      setContent(template.prompts.join("\n") + "\n");
    }
    setStep("form");
  };

  const handleSubmit = () => {
    if (!selectedProject || content.length < 50 || content.length > 200) return;

    const project = projects.find((p) => p.id === selectedProject);
    if (!project) return;

    const record: CheckinRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      projectId: selectedProject,
      projectName: project.name,
      content,
      tags: selectedTags.length > 0 ? selectedTags : project.tags.slice(0, 2),
      templateId: selectedTemplate,
    };

    addCheckinRecord(record);
    onSuccess();
    resetForm();
  };

  const resetForm = () => {
    setSelectedProject("");
    setContent("");
    setSelectedTags([]);
    setSelectedTemplate("");
    setStep("template");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-normal text-text-primary">
            {step === "template" ? "选择打卡模板" : "学习打卡"}
          </h2>
          <button
            onClick={handleClose}
            className="text-text-muted hover:text-text-primary text-2xl"
          >
            ×
          </button>
        </div>

        {step === "template" ? (
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className="p-4 border border-border hover:border-text-muted transition-colors text-left"
              >
                <span className="text-2xl mb-2 block">{template.icon}</span>
                <h3 className="text-sm font-normal text-text-primary mb-1">
                  {template.name}
                </h3>
                <p className="text-xs text-text-muted">{template.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-sm text-text-secondary mb-2">
                选择项目
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full p-3 border border-border rounded-2xl text-sm text-text-primary bg-white focus:outline-none focus:border-text-muted"
              >
                <option value="">请选择学习的项目</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.emoji} {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-text-secondary mb-2">
                学习内容 ({content.length}/200)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="记录今天的学习内容..."
                className="w-full p-3 border border-border rounded-2xl text-sm text-text-primary bg-white focus:outline-none focus:border-text-muted h-32 resize-none"
                maxLength={200}
              />
              {content.length < 50 && content.length > 0 && (
                <p className="text-xs text-red-500 mt-1">至少需要50个字符</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm text-text-secondary mb-2">
                标签
              </label>
              <div className="flex flex-wrap gap-2">
                {["LLM", "Agent", "RAG", "Framework", "Tool", "Practice"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 text-xs border transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-text-primary text-white border-text-primary"
                        : "bg-white text-text-muted border-border hover:border-text-muted"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("template")}
                className="flex-1 py-3 border border-border text-text-secondary rounded-2xl text-sm"
              >
                返回
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedProject || content.length < 50 || content.length > 200}
                className="flex-1 py-3 bg-text-primary text-white rounded-2xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交打卡
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
