export type Locale = 'en' | 'zh';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      fortune: 'AI Insights',
      chat: 'AI Chat',
    },

    // Home Page
    home: {
      title: 'AI Chief Andy',
      subtitle: 'AI-Powered Strategic Insights',
      description: 'Ancient wisdom meets AI intelligence, designed for decision-makers',
      cta: 'Get Started',
      testimonial: 'Trusted by 100+ business leaders',

      // Social Proof
      socialProof: {
        title: 'Trusted by Decision Makers',
        stats: {
          clients: '100+',
          clientsLabel: 'Business Leaders',
          satisfaction: '95%',
          satisfactionLabel: 'Satisfaction Rate',
          experience: '10+',
          experienceLabel: 'Years Experience',
        },
      },

      // Trust Elements
      trust: {
        guarantee: '30-Day Satisfaction Guarantee',
        guaranteeDesc: 'Not satisfied? Full refund, no questions asked',
        privacy: 'Your Privacy Protected',
        privacyDesc: 'All personal data encrypted and confidential',
        support: '24/7 Support Available',
        supportDesc: 'Get help whenever you need it',
      },

      // Value Props
      valueProps: {
        wisdom: {
          title: 'Ancient Wisdom',
          desc1: 'Integrating I Ching, Chinese astrology',
          desc2: 'Modern interpretation of timeless insights',
        },
        ai: {
          title: 'AI Empowered',
          desc1: 'Deep analysis, precise insights',
          desc2: 'Data-driven intelligence system',
        },
        exclusive: {
          title: 'For Leaders',
          desc1: 'Tailored for CEOs & entrepreneurs',
          desc2: 'Private intelligence for elite decision-makers',
        },
      },

      // Pricing
      pricing: {
        title: 'Service Packages',
        subtitle: 'Choose your strategic guidance plan',
        basic: {
          name: 'Basic Reading',
          features: ['AI-generated insights', 'Core strategic analysis', 'Detailed text report', '48-hour delivery'],
          cta: 'Get Reading',
        },
        premium: {
          name: 'Deep Analysis',
          badge: 'Popular',
          features: ['Enhanced AI analysis', 'Multi-dimensional insights', 'Professional PDF report', 'Priority 24-hour delivery'],
          cta: 'Get Reading',
        },
        vip: {
          name: 'Premium Consultation',
          features: ['Everything in Deep Analysis', 'Personal 60-min consultation with Andy', 'Custom strategy roadmap', 'Long-term follow-up guidance'],
          cta: 'Book Now',
        },
      },

      // Footer
      footer: {
        copyright: '© 2026 AI Chief Andy · AI-Powered Strategic Insights',
        aiChat: 'AI Chat',
      },
    },

    // Fortune Page
    fortune: {
      title: 'AI Strategic Insights',
      subtitle: 'Combining ancient wisdom with AI analysis for your critical decisions',

      // Package Selection
      selectPackage: 'Choose Your Service Package',

      // Payment
      payment: {
        title: 'Confirm Order',
        package: 'Package',
        amount: 'Amount',
        devNotice: '🎁 Free Beta Access',
        devDesc: 'Currently in beta - full experience at no cost',
        willSupport: 'Official payment launching soon',
        paymentMethods: 'Stripe / PayPal / Credit Card',
        continueBtn: 'Start My Free Analysis',
        backBtn: 'Back to Packages',
      },

      // Form
      form: {
        title: 'Your Information',
        name: 'Name',
        namePlaceholder: 'Enter your name',
        gender: 'Gender',
        genderSelect: 'Please select',
        male: 'Male',
        female: 'Female',
        birthDate: 'Birth Date',
        birthTime: 'Birth Time',
        birthPlace: 'Birth Place (Optional)',
        birthPlacePlaceholder: 'e.g., New York',
        question: 'Your Current Challenge or Decision',
        questionPlaceholder: 'e.g., Career direction, major investment, life planning...',
        submitBtn: 'Start Analysis',
        required: '*',
      },

      // Loading
      loading: {
        title: 'AI Chief is analyzing your insights...',
        estimate: 'Estimated time: 30-60 seconds',
        step1: '📊 Analyzing birth chart...',
        step2: '🔮 Computing destiny patterns...',
        step3: '✨ Generating strategic insights...',
      },

      // Result
      result: {
        title: 'Your Strategic Insights',
        ctaTitle: 'Want Deeper Analysis?',
        ctaDesc: 'AI insights are just the beginning, true wisdom comes from deep dialogue',
        qrTitle: 'AI Chief Andy',
        qrDesc: '10+ years of strategic advisory experience',
        benefits: {
          title: 'Andy personally provides:',
          item1: 'Deep interpretation of insights behind the analysis',
          item2: 'Customized recommendations for your specific situation',
          item3: 'Long-term guidance to seize critical decisions',
        },
        bookBtn: 'Book Deep Consultation',
        testimonial: '50+ business leaders gained breakthroughs through deep consultation',
        retryBtn: 'New Reading',
        homeBtn: 'Back Home',
      },

      // Error
      error: {
        title: '## ❌ Service Temporarily Unavailable',
        sorry: 'We apologize, the analysis service encountered an issue.',
        reasons: '**Possible reasons:**',
        reason1: '- Server maintenance',
        reason2: '- Network connection unstable',
        reason3: '- API quota exceeded',
        suggestions: '**Suggestions:**',
        suggestion1: '- Please try again later',
        suggestion2: '- Or contact Andy directly for personal consultation',
        contact: 'For assistance, please contact Andy.',
      },
    },

    // Chat Page
    chat: {
      title: '💬 Chat with AI Chief Andy',
      subtitle: 'Trained on Andy\'s public projects and content, AI-generated responses',
      welcome: `Hello! I'm AI Chief Andy's AI assistant 🤖

Trained on Andy's public projects and content, I can help you:

• Learn about Andy's open-source projects
• Answer AI product questions
• Share technical learning paths
• Provide project usage guidance

What would you like to know?`,
      placeholder: 'Type your question...',
      sendBtn: 'Send',
    },

    // Common
    common: {
      currency: '$',
      wechat: 'WeChat',
      email: 'Email',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
    },

    // Auth Gate
    auth: {
      checking: 'Loading...',
      title: 'Chat Access Required',
      subtitle: 'Enter authorization code to unlock AI Chief Andy chat',
      placeholder: 'Enter authorization code',
      errorInvalid: 'Invalid code. Please contact AI Chief Andy for access.',
      unlockBtn: 'Unlock Chat',
      noCode: 'No code?',
      contact: 'Email',
      contactValue: 'andy@aipm.io',
    },

    // Login Page
    login: {
      title: 'AI Chief Andy',
      subtitle: 'AI-Powered Strategic Insights',
      features: {
        title: 'Core Features',
        reading: {
          title: 'AI Insights Analysis',
          desc: 'Strategic guidance combining ancient wisdom & AI',
        },
        chat: {
          title: 'AI Chat Consultation',
          desc: 'Trained on Andy\'s expertise and projects',
        },
        personalized: {
          title: 'Personalized Reports',
          desc: 'Deep analysis tailored to your situation',
        },
      },
      loginBtn: 'Sign In',
      loginBtnLoading: 'Signing In...',
      agreement: 'By signing in, you agree to our',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
    },

    // API Messages
    api: {
      errorRequired: 'Please fill in all required fields: Name, Gender, Birth Date, Birth Time',
      errorConfig: 'Service configuration error',
      errorUnavailable: 'Analysis service temporarily unavailable',
      errorRetry: 'Analysis failed, please try again',
    },
  },

  zh: {
    // Navigation
    nav: {
      home: '首页',
      fortune: '天机测算',
      chat: 'AI 对话',
    },

    // Home Page
    home: {
      title: 'AI 酋长',
      subtitle: '东方智慧决策系统',
      description: '千年智慧，AI 赋能，为决策者而生',
      cta: '开始测算',
      testimonial: '已为 100+ 企业家提供决策洞察',

      // Social Proof
      socialProof: {
        title: '深受决策者信赖',
        stats: {
          clients: '100+',
          clientsLabel: '企业家客户',
          satisfaction: '95%',
          satisfactionLabel: '满意度',
          experience: '10+',
          experienceLabel: '年咨询经验',
        },
      },

      // Trust Elements
      trust: {
        guarantee: '30天满意保证',
        guaranteeDesc: '不满意？无理由全额退款',
        privacy: '隐私安全保护',
        privacyDesc: '所有个人信息加密存储，严格保密',
        support: '7×24 小时支持',
        supportDesc: '随时获得帮助和解答',
      },

      valueProps: {
        wisdom: {
          title: '东方智慧传承',
          desc1: '融合易经、命理、风水',
          desc2: '千年智慧的现代诠释',
        },
        ai: {
          title: 'AI 科技赋能',
          desc1: '深度分析、精准洞察',
          desc2: '大数据驱动的智能系统',
        },
        exclusive: {
          title: '决策者专属',
          desc1: 'CEO、企业家定制',
          desc2: '高端人群的私人智囊',
        },
      },

      pricing: {
        title: '服务套餐',
        subtitle: '选择适合您的决策辅助方案',
        basic: {
          name: '基础测算',
          features: ['AI 智能生成', '核心战略分析', '详细文字报告', '48小时交付'],
          cta: '立即测算',
        },
        premium: {
          name: '深度解读',
          badge: '推荐',
          features: ['增强版 AI 分析', '多维度深度洞察', '专业 PDF 报告', '优先 24小时交付'],
          cta: '立即测算',
        },
        vip: {
          name: '至尊咨询',
          features: ['包含深度解读全部内容', 'Andy 亲自 60分钟咨询', '定制战略路线图', '长期跟踪指导'],
          cta: '立即预约',
        },
      },

      footer: {
        copyright: '© 2026 AI 酋长 Andy · 东方智慧决策系统',
        aiChat: 'AI 对话',
      },
    },

    fortune: {
      title: '天机测算',
      subtitle: '融合东方智慧与 AI 洞察，为您的重大决策提供指引',
      selectPackage: '选择您的服务套餐',

      payment: {
        title: '确认订单',
        package: '套餐',
        amount: '金额',
        devNotice: '🎁 限时免费体验',
        devDesc: '当前为内测阶段，免费体验完整服务',
        willSupport: '正式上线后将开通',
        paymentMethods: '支付宝 / 微信支付 / 企业转账',
        continueBtn: '开始免费测算',
        backBtn: '返回选择套餐',
      },

      form: {
        title: '填写您的信息',
        name: '姓名',
        namePlaceholder: '请输入姓名',
        gender: '性别',
        genderSelect: '请选择',
        male: '男',
        female: '女',
        birthDate: '出生日期',
        birthTime: '出生时间',
        birthPlace: '出生地（选填）',
        birthPlacePlaceholder: '例如：北京市',
        question: '您当前面临的问题或决策',
        questionPlaceholder: '例如：事业发展方向、重大投资决策、人生规划...',
        submitBtn: '开始测算',
        required: '*',
      },

      loading: {
        title: 'AI 酋长正在为您解读天机...',
        estimate: '预计需要 30-60 秒',
        step1: '📊 分析生辰八字...',
        step2: '🔮 推演命理格局...',
        step3: '✨ 生成决策建议...',
      },

      result: {
        title: '您的天机测算结果',
        ctaTitle: '想要更深入的解读？',
        ctaDesc: 'AI 测算只是开始，真正的智慧在于深度对话',
        qrTitle: 'AI 酋长 Andy',
        qrDesc: '10+ 年企业家决策顾问经验',
        benefits: {
          title: 'Andy 亲自为您：',
          item1: '深度解读测算结果背后的玄机',
          item2: '结合您的实际情况提供定制建议',
          item3: '长期跟踪指导，助您把握关键决策',
        },
        bookBtn: '预约深度咨询',
        testimonial: '已有 50+ 企业家通过深度咨询获得突破',
        retryBtn: '再测一次',
        homeBtn: '返回首页',
      },

      error: {
        title: '## ❌ 服务暂时不可用',
        sorry: '很抱歉，测算服务遇到了问题。',
        reasons: '**可能的原因：**',
        reason1: '- 服务器正在维护',
        reason2: '- 网络连接不稳定',
        reason3: '- API 配额已用完',
        suggestions: '**建议：**',
        suggestion1: '- 请稍后再试',
        suggestion2: '- 或直接联系 Andy 进行人工咨询',
        contact: '如需帮助，请添加 Andy 企业微信。',
      },
    },

    chat: {
      title: '💬 与 AI酋长Andy 对话',
      subtitle: '基于Andy的公开项目和内容训练，内容由AI生成',
      welcome: `你好！我是 AI酋长Andy 的 AI 分身 🤖

基于 Andy 的公开项目和内容训练而成，可以帮你：

• 了解 Andy 的开源项目
• 解答 AI 产品相关问题
• 分享技术学习路径
• 提供项目使用建议

有什么想问的，尽管说～`,
      placeholder: '输入你的问题...',
      sendBtn: '发送',
    },

    common: {
      currency: '¥',
      wechat: '微信',
      email: '邮箱',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
    },

    // Auth Gate
    auth: {
      checking: '加载中...',
      title: '对话功能需要授权',
      subtitle: '输入授权码解锁 AI 酋长Andy 的对话功能',
      placeholder: '请输入授权码',
      errorInvalid: '授权码无效，请联系 AI 酋长Andy 获取',
      unlockBtn: '解锁对话',
      noCode: '没有授权码？',
      contact: '联系邮箱',
      contactValue: 'andy@aipm.io',
    },

    // Login Page
    login: {
      title: 'AI 酋长',
      subtitle: '东方智慧决策系统',
      features: {
        title: '核心功能',
        reading: {
          title: '天机测算分析',
          desc: '东方智慧与 AI 结合的战略指导',
        },
        chat: {
          title: 'AI 对话咨询',
          desc: '基于 Andy 专业经验和项目训练',
        },
        personalized: {
          title: '个性化报告',
          desc: '针对您的情况深度分析',
        },
      },
      loginBtn: '登录',
      loginBtnLoading: '登录中...',
      agreement: '登录即表示同意',
      terms: '《用户协议》',
      and: '和',
      privacy: '《隐私政策》',
    },

    // API Messages
    api: {
      errorRequired: '请填写必填信息：姓名、性别、公历出生日期、出生时间',
      errorConfig: '服务配置错误',
      errorUnavailable: '算命服务暂时不可用',
      errorRetry: '算命失败，请重试',
    },
  },
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.zh;
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'zh';

  const stored = localStorage.getItem('locale') as Locale;
  if (stored && (stored === 'en' || stored === 'zh')) return stored;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) return 'zh';

  return 'en';
}

export function setLocale(locale: Locale) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
}
