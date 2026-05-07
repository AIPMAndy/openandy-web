export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";
const DIFY_API_KEY = "app-9ZpnryN8L6cjuDOvGvEtwV37";

export async function sendMessageToDify(message: string): Promise<string> {
  try {
    const response = await fetch(DIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DIFY_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: message,
        response_mode: "blocking",
        user: "web-user",
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.answer || "抱歉，我暂时无法回答这个问题。";
  } catch (error) {
    console.error("Dify API error:", error);
    return getMockResponse(message);
  }
}

function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("推荐") || lowerMessage.includes("项目")) {
    return "我来为你推荐几个优质的 AI 开源项目：\n\n1. **LangChain** 🦜️ - LLM 应用开发框架\n2. **Ollama** 🦙 - 本地运行大模型\n3. **Dify** 🔮 - AI 应用开发平台\n\n这些项目都很适合入门学习，你想了解哪个？";
  }
  
  if (lowerMessage.includes("学习") || lowerMessage.includes("入门")) {
    return "AI 学习路径建议：\n\n1. **基础阶段** - Python + 机器学习基础\n2. **进阶阶段** - LLM 原理 + Prompt Engineering\n3. **实战阶段** - RAG + Agent 开发\n4. **深入阶段** - 模型微调 + 部署优化\n\n建议从实际项目入手，边学边做效果最好！";
  }
  
  if (lowerMessage.includes("langchain") || lowerMessage.includes("lang chain")) {
    return "LangChain 是构建 LLM 应用的瑞士军刀！\n\n**核心概念：**\n- Chain：组合多个组件\n- Agent：让 LLM 决策行动\n- Memory：对话记忆管理\n\n**学习建议：**\n1. 先看官方文档\n2. 跟着 Quickstart 走一遍\n3. 尝试构建简单的对话应用\n\n需要我推荐具体的学习资源吗？";
  }
  
  return "感谢你的提问！作为 AI酋长Andy 的 AI 分身，我可以帮你：\n\n• 推荐适合你的 AI 开源项目\n• 解答技术学习路径问题\n• 分享项目实战经验\n• 提供学习建议和资源\n\n你可以问我关于 AI 学习、项目推荐、技术栈选择等问题～";
}
