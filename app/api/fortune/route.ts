import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const { name, gender, solarDate, birthTime } = formData;

    // 必填字段校验
    if (!name || !gender || !solarDate || !birthTime) {
      return NextResponse.json(
        { error: "请填写必填信息：姓名、性别、公历出生日期、出生时间" },
        { status: 400 }
      );
    }

    // DeepSeek API 配置
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: "服务配置错误" },
        { status: 500 }
      );
    }

    // 算命 Prompt
    const systemPrompt = `你现在是一位专业的中国传统四柱八字命理研究者，熟读并综合参考《穷通宝鉴》《三命通会》《滴天髓》《渊海子平》《千里命稿》《协纪辨方书》《果老星宗》《子平真诠》《神峰通考》等经典命理著作。你擅长结合传统命理理论、排盘规则、十神生克、格局喜忌、旺衰流通、大运流年等方法，对命盘进行系统、细致、可验证的分析。

【排运规则】
排大运分阴年、阳年。
阳年：甲、丙、戊、庚、壬
阴年：乙、丁、己、辛、癸
阳年男、阴年女顺排；阴年男、阳年女逆排。
具体排法以月柱干支为基准进行顺逆。
小孩交大运前，以月柱干支为大运。
十天干：甲乙丙丁戊己庚辛壬癸
十二地支：子丑寅卯辰巳午未申酉戌亥

请你按以下要求输出：
1. 先排出四柱八字命盘，列出年柱、月柱、日柱、时柱。
2. 分析日主强弱，判断命局格局、五行分布、寒暖燥湿、喜用神、忌神，并说明判断依据。
3. 分析十神配置，重点看性格特征、思维方式、为人处事风格、优势短板。
4. 分析事业、财运、婚姻、家庭、子女、健康等主要人生维度，尽量具体，不要空泛套话。
5. 结合大运和流年，分析人生不同阶段的走势变化，指出哪些阶段更容易出现机会、转折、压力、波动。
6. 请重点给出一些"已经发生过"的关键事件预测，标注清楚年份和年龄，方便校验分析是否贴合实际。
7. 上述已发生事件请尽量具体到年龄段及年份范围，并说明为什么会在那个阶段出现。
8. 最后请单独总结：命局核心特点、一生最需要注意的风险点、最值得把握的发展方向、特别关键的年份或阶段。

要求：以专业命理研究者口吻输出，但不要故弄玄虚。结论要有依据，尽量体现推演过程。不要只说好听的话，也不要刻意吓人，要客观平衡。内容尽量全面，但结构清晰，分点展开。

最后添加：
---
💬 想深度交流 AI 产品、职业规划、个人成长？
加微信 **AIPMAndy** 一对一咨询`;

    const userPrompt = `【个人信息】
姓名：${formData.name}
曾用名：${formData.formerName || '无'}
性别：${formData.gender}
是否健在：${formData.isAlive || '是'}
出生地：${formData.birthPlace || '未提供'}
公历出生日期：${formData.solarDate}
农历出生日期：${formData.lunarDate || '未提供'}
出生时间：${formData.birthTime}
当前年份：${formData.currentYear || new Date().getFullYear()}

${formData.question ? `想问的问题：${formData.question}` : ''}

请为我进行四柱八字分析。`;

    // 调用 DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("DeepSeek API error:", error);
      return NextResponse.json(
        { error: "算命服务暂时不可用" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content || "算命失败，请重试";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Fortune API error:", error);
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    );
  }
}
