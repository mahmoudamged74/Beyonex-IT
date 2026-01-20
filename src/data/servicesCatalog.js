import {
  FaLaptopCode,
  FaMobileAlt,
  FaDatabase,
  FaServer,
  FaCode,
  FaShieldAlt
} from 'react-icons/fa'

/**
 * Real-ish marketing content for each service.
 * - Keep keys aligned with `OurService.jsx` keys: web, mobile, erp, hardware, software, cybersecurity
 * - Copy changes here only; page reads from this catalog.
 */
export const servicesCatalog = {
  web: {
    key: 'web',
    accent: '#E7B742',
    heroImage: '/assets/web.webp',
    Icon: FaLaptopCode,
    en: {
      title: 'Web Development',
      tagline: 'Modern websites & web apps built for performance and growth.',
      overview:
        'We build fast, responsive and SEO-friendly web experiences with clean architecture, scalable components, and strong UI/UX.'
    },
    ar: {
      title: 'تطوير مواقع الويب',
      tagline: 'مواقع وتطبيقات ويب حديثة مبنية للأداء والنمو.',
      overview:
        'بنشتغل على مواقع سريعة ومتجاوبة ومهيّأة لمحركات البحث، مع بنية نظيفة، ومكوّنات قابلة للتوسع، وتجربة مستخدم قوية.'
    },
    stacks: [
      'HTML5',
      'CSS3',
      'Bootstrap',
      'JavaScript',
      'React',
      'REST APIs',
      'SEO',
      'Performance'
    ],
    deliverables: [
      { en: 'Landing pages & corporate websites', ar: 'Landing pages ومواقع شركات' },
      { en: 'Dashboards & admin panels', ar: 'Dashboards ولوحات تحكم' },
      { en: 'E-commerce storefronts', ar: 'متاجر إلكترونية' },
      { en: 'Forms, integrations, analytics', ar: 'نماذج، تكاملات، وتحليلات' }
    ]
  },
  mobile: {
    key: 'mobile',
    accent: '#2196F3',
    heroImage: '/assets/mobile.webp',
    Icon: FaMobileAlt,
    en: {
      title: 'Mobile Apps',
      tagline: 'Cross-platform apps with native-like performance.',
      overview:
        'We create mobile apps with smooth UX, scalable state management, and secure API integration — ready for App Store & Google Play.'
    },
    ar: {
      title: 'تطبيقات الموبايل',
      tagline: 'تطبيقات Cross‑platform بأداء قريب من الـ Native.',
      overview:
        'بنطوّر تطبيقات موبايل بتجربة استخدام سلسة، وإدارة حالة قوية، وتكامل آمن مع الـ APIs — جاهزة للنشر على المتاجر.'
    },
    stacks: [
      'Flutter',
      'Dart',
      'State Management (Bloc/Riverpod)',
      'Firebase',
      'REST APIs',
      'Push Notifications',
      'CI/CD'
    ],
    deliverables: [
      { en: 'iOS & Android apps (Flutter)', ar: 'تطبيقات iOS وAndroid (Flutter)' },
      { en: 'Auth, profiles, payments, maps', ar: 'تسجيل/دخول، بروفايل، مدفوعات، خرائط' },
      { en: 'Admin dashboards integration', ar: 'تكامل مع Dashboards ولوحات تحكم' },
      { en: 'App store publishing support', ar: 'مساعدة في النشر على المتاجر' }
    ]
  },
  erp: {
    key: 'erp',
    accent: '#4CAF50',
    heroImage: '/assets/erp.webp',
    Icon: FaDatabase,
    en: {
      title: 'ERP & Business Systems',
      tagline: 'Automate operations and unify your data.',
      overview:
        'We help you implement or customize ERP workflows to improve visibility, reduce manual work, and enable better decision-making.'
    },
    ar: {
      title: 'أنظمة ERP وإدارة الأعمال',
      tagline: 'أتمتة العمليات وتوحيد البيانات.',
      overview:
        'بنساعدك في تطبيق أو تخصيص أنظمة ERP وتهيئة الـ workflows لتحسين المتابعة وتقليل الشغل اليدوي ورفع كفاءة القرار.'
    },
    stacks: [
      'Requirements & process mapping',
      'ERP customization',
      'Integrations',
      'Data migration',
      'Reporting',
      'Role-based access'
    ],
    deliverables: [
      { en: 'Inventory / Sales / Accounting flows', ar: 'مخزون / مبيعات / حسابات' },
      { en: 'Custom modules & reports', ar: 'Modules وتقارير مخصصة' },
      { en: 'Integrations with website & apps', ar: 'تكامل مع الويب والموبايل' },
      { en: 'Training & handover', ar: 'تدريب وتسليم' }
    ]
  },
  hardware: {
    key: 'hardware',
    accent: '#FF9800',
    heroImage: '/assets/hardware.webp',
    Icon: FaServer,
    en: {
      title: 'Hardware & Infrastructure',
      tagline: 'Reliable infrastructure, ready for scale.',
      overview:
        'From networking and servers to setup and maintenance — we ensure your infrastructure is stable, secure, and monitored.'
    },
    ar: {
      title: 'الهاردوير والبنية التحتية',
      tagline: 'بنية تحتية موثوقة وجاهزة للتوسع.',
      overview:
        'من الشبكات والسيرفرات للتجهيز والصيانة—بنضمن استقرار وأمان البنية التحتية والمتابعة المستمرة.'
    },
    stacks: [
      'Network design',
      'Servers & storage',
      'Cabling & racks',
      'Backup & monitoring',
      'CCTV & access control',
      'Maintenance'
    ],
    deliverables: [
      { en: 'Office network setup & optimization', ar: 'تجهيز وتحسين شبكات الشركات' },
      { en: 'Servers installation & monitoring', ar: 'تركيب ومراقبة السيرفرات' },
      { en: 'Backup & disaster recovery planning', ar: 'خطط النسخ الاحتياطي والتعافي' },
      { en: 'Support contracts & maintenance', ar: 'عقود دعم وصيانة' }
    ]
  },
  software: {
    key: 'software',
    accent: '#9C27B0',
    heroImage: '/assets/software.webp',
    Icon: FaCode,
    en: {
      title: 'Custom Software',
      tagline: 'Tailor-made systems that fit your workflow.',
      overview:
        'We build custom software solutions that match your business logic, integrate with existing tools, and scale with your needs.'
    },
    ar: {
      title: 'برمجيات مخصصة',
      tagline: 'حلول معمولة مخصوص على احتياجك.',
      overview:
        'بنطوّر أنظمة مخصصة تناسب منطق شغلك، وتتوافق مع الأدوات الموجودة، وتكبر مع توسعك.'
    },
    stacks: [
      'System design',
      'APIs & integrations',
      'Database modeling',
      'Authentication',
      'Testing',
      'Documentation'
    ],
    deliverables: [
      { en: 'Internal tools & automation', ar: 'أدوات داخلية وأتمتة' },
      { en: 'Custom portals for clients/partners', ar: 'بوابات للعملاء/الشركاء' },
      { en: 'Integrations & data pipelines', ar: 'تكاملات وخطوط بيانات' },
      { en: 'Support & continuous improvement', ar: 'دعم وتطوير مستمر' }
    ]
  },
  cybersecurity: {
    key: 'cybersecurity',
    accent: '#F44336',
    heroImage: '/assets/security.webp',
    Icon: FaShieldAlt,
    en: {
      title: 'Cybersecurity',
      tagline: 'Protect systems, data, and users.',
      overview:
        'We assess risks, harden systems, and implement security best practices to reduce vulnerabilities and improve compliance.'
    },
    ar: {
      title: 'الأمن السيبراني',
      tagline: 'حماية الأنظمة والبيانات والمستخدمين.',
      overview:
        'بنقيّم المخاطر، ونقوّي الأنظمة، ونطبق أفضل ممارسات الأمان لتقليل الثغرات وتحسين الالتزام.'
    },
    stacks: [
      'Risk assessment',
      'Hardening',
      'Penetration testing',
      'Policies & access control',
      'Monitoring',
      'Awareness training'
    ],
    deliverables: [
      { en: 'Security audit & recommendations', ar: 'تدقيق أمني وتوصيات' },
      { en: 'Vulnerability assessment / pentest', ar: 'فحص ثغرات / اختبار اختراق' },
      { en: 'Access control & backups strategy', ar: 'إدارة صلاحيات وخطة نسخ احتياطي' },
      { en: 'Security awareness sessions', ar: 'جلسات توعية أمنية' }
    ]
  }
}

export function getServiceByKey(key) {
  if (!key) return null
  return servicesCatalog[key] ?? null
}

