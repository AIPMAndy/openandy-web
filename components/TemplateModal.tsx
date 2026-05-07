"use client";

import { templates } from "@/lib/templates";

interface TemplateModalProps {
  isOpen: boolean;
  onSelect: (templateId: string) => void;
  onClose: () => void;
}

export default function TemplateModal({ isOpen, onSelect, onClose }: TemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-normal text-text-primary">选择打卡模板</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
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
      </div>
    </div>
  );
}
