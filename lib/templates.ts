export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompts: string[];
}

export const templates: Template[] = [
  {
    id: "daily",
    name: "每日AI学习",
    description: "记录每天的AI学习内容",
    icon: "📚",
    prompts: [
      "今天学习了...",
      "最大的收获是...",
      "明天计划...",
    ],
  },
  {
    id: "practice",
    name: "项目实践",
    description: "记录AI项目实践过程",
    icon: "🛠️",
    prompts: [
      "实践的项目是...",
      "遇到的问题和解决方案...",
      "学到的经验...",
    ],
  },
  {
    id: "paper",
    name: "论文阅读",
    description: "记录AI论文阅读笔记",
    icon: "📄",
    prompts: [
      "阅读的论文是...",
      "核心观点...",
      "对自己的启发...",
    ],
  },
  {
    id: "tool",
    name: "工具探索",
    description: "记录AI工具使用体验",
    icon: "🔧",
    prompts: [
      "探索的工具是...",
      "主要功能和特点...",
      "适用场景...",
    ],
  },
  {
    id: "thought",
    name: "思考总结",
    description: "记录AI学习的思考",
    icon: "💭",
    prompts: [
      "今天的思考...",
      "对AI行业的观察...",
      "未来的学习方向...",
    ],
  },
  {
    id: "custom",
    name: "自定义",
    description: "自由记录学习内容",
    icon: "✏️",
    prompts: [],
  },
];
