# Sealos 部署指南

## 部署步骤

### 1. 准备工作
- 登录 Sealos 平台：https://cloud.sealos.io
- 确保账户有余额（你有 250 元）
- 准备好域名

### 2. 在 Sealos 创建应用

#### 方式 A：使用 GitHub 自动部署（推荐）
1. 在 Sealos 选择「应用管理」→「新建应用」
2. 选择「从 Git 仓库部署」
3. 连接 GitHub 仓库：`https://github.com/AIPMAndy/openandy-web`
4. 配置构建设置：
   - 构建命令：`npm install && npm run build`
   - 启动命令：`npm start`
   - 端口：`3000`

#### 方式 B：使用 Docker 部署
1. 在 Sealos 选择「应用管理」→「新建应用」
2. 选择「从 Docker 镜像部署」
3. 先在本地构建并推送镜像：
   ```bash
   # 构建镜像
   docker build -t openandy-web .
   
   # 推送到 Docker Hub（需要先登录）
   docker tag openandy-web your-dockerhub-username/openandy-web:latest
   docker push your-dockerhub-username/openandy-web:latest
   ```
4. 在 Sealos 填入镜像地址

### 3. 配置环境变量
在 Sealos 应用设置中添加：
```
NODE_ENV=production
PORT=3000
```

### 4. 绑定域名
1. 在 Sealos 应用详情中找到「域名管理」
2. 添加你的自定义域名
3. Sealos 会提供一个 CNAME 或 A 记录地址

### 5. 配置 DNS
在你的域名服务商（如阿里云、腾讯云）添加解析记录：
- 类型：CNAME
- 主机记录：@ 或 www
- 记录值：Sealos 提供的地址
- TTL：600

### 6. 等待生效
- DNS 解析通常需要 10 分钟到 1 小时
- 访问你的域名测试

## 费用说明
- Sealos 按使用量计费
- 小型 Next.js 应用约 0.5-2 元/天
- 250 元余额可以用几个月

## 注意事项
1. 确保 Dockerfile 和 next.config.js 已配置好（已完成）
2. 如果使用 GitHub 自动部署，每次 push 代码会自动重新部署
3. 国内访问速度会比 Vercel 快很多
