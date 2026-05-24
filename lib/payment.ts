// 支付相关类型定义
export type PackageType = "basic" | "premium" | "vip";

export interface PaymentOrder {
  id: string;
  packageType: PackageType;
  price: number;
  status: "pending" | "paid" | "failed";
  createdAt: Date;
}

// 套餐配置
export const PACKAGES = {
  basic: {
    name: "基础测算",
    price: 299,
    features: ["AI 自动生成", "基础洞察", "文字报告"],
  },
  premium: {
    name: "深度解读",
    price: 999,
    features: ["AI 深度分析", "专家点评", "PDF 报告"],
  },
  vip: {
    name: "至尊咨询",
    price: 2999,
    features: ["Andy 亲自解读", "1对1 咨询", "定制方案", "长期跟踪"],
  },
} as const;

// 生成订单 ID
export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 创建支付订单（模拟）
export async function createPaymentOrder(
  packageType: PackageType
): Promise<PaymentOrder> {
  const pkg = PACKAGES[packageType];

  if (!pkg) {
    throw new Error("Invalid package type");
  }

  // 模拟订单创建
  const order: PaymentOrder = {
    id: generateOrderId(),
    packageType,
    price: pkg.price,
    status: "pending",
    createdAt: new Date(),
  };

  // 在实际应用中，这里应该：
  // 1. 调用支付宝/微信支付 API 创建订单
  // 2. 将订单信息存储到数据库
  // 3. 返回支付二维码或支付链接

  return order;
}

// 验证支付状态（模拟）
export async function verifyPayment(orderId: string): Promise<boolean> {
  // 在实际应用中，这里应该：
  // 1. 查询数据库中的订单状态
  // 2. 调用支付平台 API 验证支付状态
  // 3. 更新订单状态

  // 模拟：总是返回支付成功
  return true;
}

// 支付回调处理（模拟）
export async function handlePaymentCallback(data: {
  orderId: string;
  status: string;
  transactionId?: string;
}): Promise<void> {
  // 在实际应用中，这里应该：
  // 1. 验证回调签名
  // 2. 更新数据库中的订单状态
  // 3. 触发后续业务逻辑（发送通知、生成报告等）

  console.log("Payment callback received:", data);
}

// 获取支付二维码（模拟）
export async function getPaymentQRCode(orderId: string): Promise<string> {
  // 在实际应用中，这里应该：
  // 1. 调用支付平台 API 获取支付二维码
  // 2. 返回二维码图片 URL 或 base64 数据

  // 模拟：返回占位符
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${orderId}`;
}
