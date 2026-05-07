# Open Andy Web

AI酋长Andy的AI学习平台 - 发现优质AI项目，记录学习打卡

## 功能特性

### 🤖 AI对话
- 与AI酋长Andy的AI分身对话
- 支持项目推荐、学习路径解答
- 集成Dify API，支持智能问答

### 🏠 发现优质AI项目
- 15+精选开源AI项目
- 支持搜索和标签筛选
- 项目详情、Andy点评、相关链接

### 📝 学习打卡
- 每日学习打卡记录
- 6种打卡模板选择
- 学习记录管理
- 连续打卡统计

### 👤 个人中心
- 学习数据统计
- 打卡天数、连续天数
- 学习标签分布可视化
- 最近活动记录

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据存储**: localStorage
- **API**: Dify AI

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
OpenAndy-Web/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 发现页
│   ├── chat/page.tsx       # AI对话页
│   ├── checkin/page.tsx    # 学习打卡页
│   ├── profile/page.tsx    # 个人中心页
│   ├── project/[id]/       # 项目详情页
│   └── login/page.tsx      # 登录页
├── components/             # 可复用组件
│   ├── Nav.tsx             # 底部导航
│   ├── ChatMessage.tsx     # 聊天消息
│   ├── ProjectCard.tsx     # 项目卡片
│   ├── CheckinModal.tsx    # 打卡弹窗
│   └── TemplateModal.tsx   # 模板选择弹窗
├── lib/                    # 工具库
│   ├── projects.ts         # 项目数据
│   ├── templates.ts        # 打卡模板
│   ├── storage.ts          # 本地存储
│   └── dify.ts             # Dify API
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 设计规范

- **风格**: 极简、干净、大量留白
- **颜色**: 
  - 背景: #FAFAF9 (暖灰)
  - 主文字: #18181B
  - 次文字: #52525B
  - 弱文字: #A1A1AA
  - 边框: #F5F5F4
- **圆角**: 卡片 0px，输入框/按钮 24px
- **布局**: 移动端优先响应式设计

## 部署

### Vercel 部署

1. Push 代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 许可证

MIT License

## 作者

AI酋长Andy
