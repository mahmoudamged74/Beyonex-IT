import {
  FaLaptopCode,
  FaMobileAlt,
  FaDatabase,
  FaServer,
  FaCode,
  FaShieldAlt,
} from "react-icons/fa";

/**
 * Real-ish marketing content for each service.
 * - Keep keys aligned with `OurService.jsx` keys: web, mobile, erp, hardware, software, cybersecurity
 * - Copy changes here only; page reads from this catalog.
 */
export const servicesCatalog = {
  ui: {
    key: "ui",
    accent: "#E7B742",
    heroImage: "/assets/web.webp",
    Icon: FaLaptopCode,
    en: {
      title: "UI/UX Enhancement",
      tagline: [
        {
          id: 1,
          title: "نرفع مستوى واجهتك… ونطوّر تجربة مستخدمك",
          description: [
            "في بيونكس للتقنية، نعمل على تحسين واجهات المستخدم وتجربة الاستخدام داخل موقعك أو تطبيقك الحالي، من خلال تطوير التصميم، تبسيط التفاعل، وتحسين تدفّق الرحلة بما يضمن أداء أفضل ورضا أعلى.",
          ],
        },
        {
          id: 2,
          title: "واجهة أجمل… تجربة أسهل… نتائج أقوى",
          description: [
            "نقوم بتحليل الواجهة الحالية، تحديد نقاط التعقيد، ثم تنفيذ تحسينات مدروسة تجعل التصميم أوضح، أسرع، وأكثر جاذبية دون الحاجة لإعادة بناء المنتج بالكامل.",
          ],
        },
        {
          id: 3,
          title: "تحسينات مستمرة تعتمد على البيانات",
          description: [
            "نراقب سلوك المستخدم بعد التعديلات، ونقدّم توصيات تطوير دورية تضمن بقاء واجهتك حديثة ومتوافقة مع توقعات جمهورك.",
          ],
        },
      ],
    },
    ar: {
      title: "تحسين واجهات وتجربة المستخدم",
      tagline: [
        {
          id: 1,
          title: "نرفع مستوى واجهتك… ونطوّر تجربة مستخدمك",
          description: [
            "في بيونكس للتقنية، نعمل على تحسين واجهات المستخدم وتجربة الاستخدام داخل موقعك أو تطبيقك الحالي، من خلال تطوير التصميم، تبسيط التفاعل، وتحسين تدفّق الرحلة بما يضمن أداء أفضل ورضا أعلى.",
          ],
        },
        {
          id: 2,
          title: "واجهة أجمل… تجربة أسهل… نتائج أقوى",
          description: [
            "نقوم بتحليل الواجهة الحالية، تحديد نقاط التعقيد، ثم تنفيذ تحسينات مدروسة تجعل التصميم أوضح، أسرع، وأكثر جاذبية دون الحاجة لإعادة بناء المنتج بالكامل.",
          ],
        },
        {
          id: 3,
          title: "تحسينات مستمرة تعتمد على البيانات",
          description: [
            "نراقب سلوك المستخدم بعد التعديلات، ونقدّم توصيات تطوير دورية تضمن بقاء واجهتك حديثة ومتوافقة مع توقعات جمهورك.",
          ],
        },
      ],
    },
    stacks: [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript",
      "React",
      "REST APIs",
      "SEO",
      "Performance",
    ],
    deliverables: [
      {
        en: "Landing pages & corporate websites",
        ar: "Landing pages ومواقع شركات",
      },
      { en: "Dashboards & admin panels", ar: "Dashboards ولوحات تحكم" },
      { en: "E-commerce storefronts", ar: "متاجر إلكترونية" },
      { en: "Forms, integrations, analytics", ar: "نماذج، تكاملات، وتحليلات" },
    ],
  },
  web: {
    key: "web",
    accent: "#E7B742",
    heroImage: "/assets/web.webp",
    Icon: FaLaptopCode,
    en: {
      title: "Web Development / Web Design",
      tagline: [
        {
          id: 1,
          title: "موقعك هو بوابتك الرقمية إلى عملائك",
          description: [
            "امتلاك موقع إلكتروني لم يعد رفاهية، بل ضرورة أساسية لنجاح ونمو أي نشاط تجاري في العصر الرقمي. الموقع الاحترافي يعكس قوة علامتك التجارية ويمنح عملاءك تجربة موثوقة وسهلة.",
          ],
        },
        {
          id: 2,
          title: "في بيونكس للتقنية… نصمّم مواقع تحقق أهدافك",
          description: [
            "نقدم حلول تصميم وتطوير مواقع مبنية على فهم احتياجاتك، واختيار التقنية المناسبة، وتقديم تجربة استخدام متكاملة. نركز على الجودة في كل تفصيله لضمان موقع سريع، آمن، ومتوافق مع مختلف الأجهزة.",
          ],
        },
      ],
    },
    ar: {
      title: "تصميم وتطوير المواقع",
      tagline: [
        {
          id: 1,
          title: "موقعك هو بوابتك الرقمية إلى عملائك",
          description: [
            "امتلاك موقع إلكتروني لم يعد رفاهية، بل ضرورة أساسية لنجاح ونمو أي نشاط تجاري في العصر الرقمي. الموقع الاحترافي يعكس قوة علامتك التجارية ويمنح عملاءك تجربة موثوقة وسهلة.",
          ],
        },
        {
          id: 2,
          title: "في بيونكس للتقنية… نصمّم مواقع تحقق أهدافك",
          description: [
            "نقدم حلول تصميم وتطوير مواقع مبنية على فهم احتياجاتك، واختيار التقنية المناسبة، وتقديم تجربة استخدام متكاملة. نركز على الجودة في كل تفصيله لضمان موقع سريع، آمن، ومتوافق مع مختلف الأجهزة.",
          ],
        },
      ],
    },
    stacks: [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript",
      "React",
      "REST APIs",
      "SEO",
      "Performance",
    ],
    deliverables: [
      {
        en: "Landing pages & corporate websites",
        ar: "Landing pages ومواقع شركات",
      },
      { en: "Dashboards & admin panels", ar: "Dashboards ولوحات تحكم" },
      { en: "E-commerce storefronts", ar: "متاجر إلكترونية" },
      { en: "Forms, integrations, analytics", ar: "نماذج، تكاملات، وتحليلات" },
    ],
  },
  mobile: {
    key: "mobile",
    accent: "#2196F3",
    heroImage: "/assets/mobile.webp",
    Icon: FaMobileAlt,
    en: {
      title: "Mobile Development",
      tagline: [
        {
          id: 1,
          title: "موقعك هو بوابتك الرقمية إلى عملائك",
          description: [
            "امتلاك موقع إلكتروني لم يعد رفاهية، بل ضرورة أساسية لنجاح ونمو أي نشاط تجاري في العصر الرقمي. الموقع الاحترافي يعكس قوة علامتك التجارية ويمنح عملاءك تجربة موثوقة وسهلة.",
          ],
        },
        {
          id: 2,
          title: "في بيونكس للتقنية… نصمّم مواقع تحقق أهدافك",
          description: [
            "نقدم حلول تصميم وتطوير مواقع مبنية على فهم احتياجاتك، واختيار التقنية المناسبة، وتقديم تجربة استخدام متكاملة. نركز على الجودة في كل تفصيله لضمان موقع سريع، آمن، ومتوافق مع مختلف الأجهزة.",
          ],
        },
      ],
    },
    ar: {
      title: "تطوير تطبيقات الجوال",
      tagline: [
        {
          id: 1,
          title: "نحو تطبيق يرفع مستوى أعمالك",
          description: [
            [
              "في بيونكس للتقنية، نطوّر تطبيقات جوال تعزز حضورك الرقمي وتفتح لك فرص نمو جديدة. ندمج الإبداع بالتقنية لنحوّل فكرتك إلى تطبيق عملي، سريع، وذو تجربة استخدام متقنة.",
            ],
          ],
        },
        {
          id: 2,
          title: "حلول تطوير شاملة… من الفكرة إلى الإطلاق",
          description: [
            [
              "نقدم خدمات تصميم واجهات التطبيقات وتطويرها، مع ضمان أداء مستقر وتجربة سلسة، وصولاً إلى نشر التطبيق في متاجر التطبيقات بكل احترافية.",
            ],
          ],
        },
        {
          id: 2,
          title: "حلول تطوير شاملة… من الفكرة إلى الإطلاق",
          description: [
            [
              "خبرة عميقة في تصميم وتطوير التطبيقات - ",
              "تواصل فعال يضمن وضوح كل مرحلة - ",
              "فريق محترف يلتزم بالجودة - ",
              "معايير عالية تضمن تطبيقاً موثوقاً وقابلاً للنمو",
            ],
          ],
        },
      ],
    },
    stacks: [
      "Flutter",
      "Dart",
      "State Management (Bloc/Riverpod)",
      "Firebase",
      "REST APIs",
      "Push Notifications",
      "CI/CD",
    ],
    deliverables: [
      {
        en: "iOS & Android apps (Flutter)",
        ar: "تطبيقات iOS وAndroid (Flutter)",
      },
      {
        en: "Auth, profiles, payments, maps",
        ar: "تسجيل/دخول، بروفايل، مدفوعات، خرائط",
      },
      {
        en: "Admin dashboards integration",
        ar: "تكامل مع Dashboards ولوحات تحكم",
      },
      { en: "App store publishing support", ar: "مساعدة في النشر على المتاجر" },
    ],
  },
  erp: {
    key: "erp",
    accent: "#4CAF50",
    heroImage: "/assets/erp.webp",
    Icon: FaDatabase,
    en: {
      title: "ERP & Business Systems",
      tagline: "Automate operations and unify your data.",
      overview:
        "We help you implement or customize ERP workflows to improve visibility, reduce manual work, and enable better decision-making.",
    },
    ar: {
      title: "أنظمة ERP وإدارة الأعمال",
      tagline: "أتمتة العمليات وتوحيد البيانات.",
      overview:
        "بنساعدك في تطبيق أو تخصيص أنظمة ERP وتهيئة الـ workflows لتحسين المتابعة وتقليل الشغل اليدوي ورفع كفاءة القرار.",
    },
    stacks: [
      "Requirements & process mapping",
      "ERP customization",
      "Integrations",
      "Data migration",
      "Reporting",
      "Role-based access",
    ],
    deliverables: [
      {
        en: "Inventory / Sales / Accounting flows",
        ar: "مخزون / مبيعات / حسابات",
      },
      { en: "Custom modules & reports", ar: "Modules وتقارير مخصصة" },
      {
        en: "Integrations with website & apps",
        ar: "تكامل مع الويب والموبايل",
      },
      { en: "Training & handover", ar: "تدريب وتسليم" },
    ],
  },
  hardware: {
    key: "hardware",
    accent: "#FF9800",
    heroImage: "/assets/hardware.webp",
    Icon: FaServer,
    en: {
      title: "Hardware & Infrastructure",
      tagline: "Reliable infrastructure, ready for scale.",
      overview:
        "From networking and servers to setup and maintenance — we ensure your infrastructure is stable, secure, and monitored.",
    },
    ar: {
      title: "الهاردوير والبنية التحتية",
      tagline: "بنية تحتية موثوقة وجاهزة للتوسع.",
      overview:
        "من الشبكات والسيرفرات للتجهيز والصيانة—بنضمن استقرار وأمان البنية التحتية والمتابعة المستمرة.",
    },
    stacks: [
      "Network design",
      "Servers & storage",
      "Cabling & racks",
      "Backup & monitoring",
      "CCTV & access control",
      "Maintenance",
    ],
    deliverables: [
      {
        en: "Office network setup & optimization",
        ar: "تجهيز وتحسين شبكات الشركات",
      },
      {
        en: "Servers installation & monitoring",
        ar: "تركيب ومراقبة السيرفرات",
      },
      {
        en: "Backup & disaster recovery planning",
        ar: "خطط النسخ الاحتياطي والتعافي",
      },
      { en: "Support contracts & maintenance", ar: "عقود دعم وصيانة" },
    ],
  },
  software: {
    key: "software",
    accent: "#9C27B0",
    heroImage: "/assets/software.webp",
    Icon: FaCode,
    en: {
      title: "Custom Software",
      tagline: "Tailor-made systems that fit your workflow.",
      overview:
        "We build custom software solutions that match your business logic, integrate with existing tools, and scale with your needs.",
    },
    ar: {
      title: "برمجيات مخصصة",
      tagline: "حلول معمولة مخصوص على احتياجك.",
      overview:
        "بنطوّر أنظمة مخصصة تناسب منطق شغلك، وتتوافق مع الأدوات الموجودة، وتكبر مع توسعك.",
    },
    stacks: [
      "System design",
      "APIs & integrations",
      "Database modeling",
      "Authentication",
      "Testing",
      "Documentation",
    ],
    deliverables: [
      { en: "Internal tools & automation", ar: "أدوات داخلية وأتمتة" },
      {
        en: "Custom portals for clients/partners",
        ar: "بوابات للعملاء/الشركاء",
      },
      { en: "Integrations & data pipelines", ar: "تكاملات وخطوط بيانات" },
      { en: "Support & continuous improvement", ar: "دعم وتطوير مستمر" },
    ],
  },
  cybersecurity: {
    key: "cybersecurity",
    accent: "#F44336",
    heroImage: "/assets/security.webp",
    Icon: FaShieldAlt,
    en: {
      title: "Cybersecurity",
      tagline: "Protect systems, data, and users.",
      overview:
        "We assess risks, harden systems, and implement security best practices to reduce vulnerabilities and improve compliance.",
    },
    ar: {
      title: "الأمن السيبراني",
      tagline: "حماية الأنظمة والبيانات والمستخدمين.",
      overview:
        "بنقيّم المخاطر، ونقوّي الأنظمة، ونطبق أفضل ممارسات الأمان لتقليل الثغرات وتحسين الالتزام.",
    },
    stacks: [
      "Risk assessment",
      "Hardening",
      "Penetration testing",
      "Policies & access control",
      "Monitoring",
      "Awareness training",
    ],
    deliverables: [
      { en: "Security audit & recommendations", ar: "تدقيق أمني وتوصيات" },
      {
        en: "Vulnerability assessment / pentest",
        ar: "فحص ثغرات / اختبار اختراق",
      },
      {
        en: "Access control & backups strategy",
        ar: "إدارة صلاحيات وخطة نسخ احتياطي",
      },
      { en: "Security awareness sessions", ar: "جلسات توعية أمنية" },
    ],
  },
};

export function getServiceByKey(key) {
  if (!key) return null;
  return servicesCatalog[key] ?? null;
}
