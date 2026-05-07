export interface CheckinRecord {
  id: string;
  date: string;
  projectId: string;
  projectName: string;
  content: string;
  tags: string[];
  templateId: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

const STORAGE_KEYS = {
  CHECKIN_RECORDS: "openandy_checkin_records",
  USER_PROFILE: "openandy_user_profile",
  LAST_CHECKIN: "openandy_last_checkin",
};

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getCheckinRecords(): CheckinRecord[] {
  if (!isClient()) return [];
  const data = localStorage.getItem(STORAGE_KEYS.CHECKIN_RECORDS);
  return data ? JSON.parse(data) : [];
}

export function addCheckinRecord(record: CheckinRecord): void {
  if (!isClient()) return;
  const records = getCheckinRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEYS.CHECKIN_RECORDS, JSON.stringify(records));
  localStorage.setItem(STORAGE_KEYS.LAST_CHECKIN, record.date);
}

export function getLastCheckinDate(): string | null {
  if (!isClient()) return null;
  return localStorage.getItem(STORAGE_KEYS.LAST_CHECKIN);
}

export function isCheckedToday(): boolean {
  const lastCheckin = getLastCheckinDate();
  if (!lastCheckin) return false;
  const today = new Date().toISOString().split("T")[0];
  return lastCheckin === today;
}

export function getContinuousDays(): number {
  const records = getCheckinRecords();
  if (records.length === 0) return 0;

  const dates = records.map((r) => r.date).sort().reverse();
  const uniqueDates = Array.from(new Set(dates));
  
  let count = 0;
  const today = new Date();
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    const expected = expectedDate.toISOString().split("T")[0];
    
    if (uniqueDates.includes(expected)) {
      count++;
    } else {
      break;
    }
  }
  
  return count;
}

export function getUserProfile(): UserProfile {
  if (!isClient()) return { name: "学习者", avatar: "👨‍💻", isLoggedIn: false };
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return data ? JSON.parse(data) : { name: "学习者", avatar: "👨‍💻", isLoggedIn: false };
}

export function saveUserProfile(profile: UserProfile): void {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export function isLoggedIn(): boolean {
  return getUserProfile().isLoggedIn;
}

export function generateSampleRecords(): void {
  if (!isClient()) return;
  const records = getCheckinRecords();
  if (records.length > 0) return;

  const sampleRecords: CheckinRecord[] = [
    {
      id: "1",
      date: new Date(Date.now() - 0 * 86400000).toISOString().split("T")[0],
      projectId: "1",
      projectName: "LangChain",
      content: "今天学习了 LangChain 的基础概念，了解了 Chain、Agent、Memory 等核心组件。最大的收获是理解了如何通过组合不同的组件来构建复杂的 AI 应用。",
      tags: ["LLM", "Framework"],
      templateId: "daily",
    },
    {
      id: "2",
      date: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
      projectId: "2",
      projectName: "Ollama",
      content: "成功在本地部署了 Ollama，运行了 Llama3 模型。性能表现超出预期，响应速度很快。明天计划测试更多模型。",
      tags: ["Local", "LLM"],
      templateId: "practice",
    },
    {
      id: "3",
      date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
      projectId: "3",
      projectName: "Dify",
      content: "探索了 Dify 平台的工作流编排功能，可以可视化地构建 AI 应用流程。适合非技术人员快速搭建 AI 应用。",
      tags: ["Platform", "LowCode"],
      templateId: "tool",
    },
    {
      id: "4",
      date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
      projectId: "10",
      projectName: "GPT Academic",
      content: "使用 GPT Academic 帮助润色了一篇英文论文，效果非常好。特别喜欢它的翻译和代码解释功能。",
      tags: ["Academic", "Tools"],
      templateId: "tool",
    },
    {
      id: "5",
      date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0],
      projectId: "6",
      projectName: "Open Interpreter",
      content: "体验了 Open Interpreter，让 AI 直接操作电脑的感觉很神奇。可以自然语言执行各种系统操作。",
      tags: ["Agent", "CLI"],
      templateId: "practice",
    },
    {
      id: "6",
      date: new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0],
      projectId: "12",
      projectName: "CrewAI",
      content: "阅读了 CrewAI 的论文和文档，多 Agent 协作的思路很有启发。角色分工+任务编排的模式值得学习。",
      tags: ["Agent", "MultiAgent"],
      templateId: "paper",
    },
    {
      id: "7",
      date: new Date(Date.now() - 6 * 86400000).toISOString().split("T")[0],
      projectId: "15",
      projectName: "LlamaIndex",
      content: "学习了 LlamaIndex 的 RAG 实现方式，数据连接和索引构建的流程很清晰。适合构建企业级知识库应用。",
      tags: ["RAG", "Framework"],
      templateId: "daily",
    },
  ];

  localStorage.setItem(STORAGE_KEYS.CHECKIN_RECORDS, JSON.stringify(sampleRecords));
  localStorage.setItem(STORAGE_KEYS.LAST_CHECKIN, sampleRecords[0].date);
}
