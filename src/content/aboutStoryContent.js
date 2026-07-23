export const professionalJourneyDescription = {
  ar: "مسيرة نمو متدرجة من التأسيس إلى منظومة تقنية متكاملة، قائمة على الابتكار والجودة وبناء الثقة مع شركائنا.",
  en: "A steady growth journey from launch to an integrated technology ecosystem—built on innovation, quality, and trusted partnerships.",
};

export const professionalMissionContent = {
  ar: "نُمكّن المؤسسات من تحويل التكنولوجيا إلى ميزة تنافسية، عبر حلول برمجية مصمّمة لاحتياجاتها، قابلة للتوسع، وتدعم أهدافها الاستراتيجية.",
  en: "We help organizations turn technology into a competitive advantage through scalable software solutions tailored to their strategic goals.",
};

export const professionalVisionContent = {
  ar: "أن نكون الشريك التقني الأول للمؤسسات في المنطقة، بخبرة موثوقة وحلول مبتكرة تحقق أثراً ملموساً ومستداماً.",
  en: "To be the region's leading technology partner—trusted for expertise, innovation, and measurable, lasting impact.",
};

export const professionalMilestonesByYear = {
  2022: {
    title: {
      ar: "سنة التأسيس والانطلاقة",
      en: "Foundation and Launch",
    },
    description: {
      ar: "انطلقت بيونكس IT كشريك تقني متخصص في الحلول الرقمية والأمن السيبراني، بأساس يربط بين متطلبات القطاعين الحكومي والخاص.",
      en: "Beyonex IT launched as a specialized technology partner in digital solutions and cybersecurity, built to serve both public and private sector needs.",
    },
  },
  2023: {
    title: {
      ar: "بداية التوسع والاعتماد المؤسسي",
      en: "Institutional Growth and Accreditation",
    },
    description: {
      ar: "عزّزت حضورها في السوق بحصولها على اعتماد علم، وتوسّعت في حلول الأمن السيبراني والتحول الرقمي مع الجهات والهيئات الحكومية.",
      en: "The company strengthened its market presence with Elm accreditation and expanded its cybersecurity and digital transformation work with government entities.",
    },
  },
  2024: {
    title: {
      ar: "تعزيز المشاريع والشراكات التقنية",
      en: "Strengthening Projects and Partnerships",
    },
    description: {
      ar: "وسّعت نطاق تنفيذ مشاريع الأمن السيبراني والبنية التحتية، وعمّقت شراكاتها مع الجهات الحكومية والمؤسسات.",
      en: "Beyonex IT scaled advanced cybersecurity and infrastructure projects while deepening partnerships with government and institutional clients.",
    },
  },
  2025: {
    title: {
      ar: "بناء منظومة تقنية متكاملة",
      en: "Building an Integrated Technology Ecosystem",
    },
    description: {
      ar: "أصبحت مظلة تقنية شاملة تشمل الأمن السيبراني، الحلول الرقمية، إدارة الأنظمة، وتطوير الأعمال التقنية.",
      en: "Beyonex IT evolved into a full technology umbrella spanning cybersecurity, digital solutions, systems management, and technology business development.",
    },
  },
  2026: {
    title: {
      ar: "توسيع الشراكات وتعزيز الحضور المؤسسي",
      en: "Expanding Partnerships and Institutional Reach",
    },
    description: {
      ar: "تواصل تعزيز حضورها عبر شراكات تقنية استراتيجية ودعم مشاريع التحول الرقمي للجهات الحكومية والخاصة.",
      en: "The company continues to expand through strategic technology partnerships and digital transformation initiatives across public and private sectors.",
    },
  },
};

export function getProfessionalMilestone(milestone) {
  const professional = professionalMilestonesByYear[milestone?.year];
  if (!professional) return milestone;

  return {
    ...milestone,
    title: professional.title,
    description: professional.description,
  };
}

export function getProfessionalPillarContent(pillarId, lang, t) {
  if (pillarId === "mission") {
    return (
      professionalMissionContent[lang] ||
      professionalMissionContent.en ||
      t("about.missionText")
    );
  }

  if (pillarId === "vision") {
    return (
      professionalVisionContent[lang] ||
      professionalVisionContent.en ||
      t("about.visionText")
    );
  }

  return "";
}

export function getProfessionalJourneyDescription(lang, t) {
  return (
    professionalJourneyDescription[lang] ||
    professionalJourneyDescription.en ||
    t("aboutPage.story.subtitle")
  );
}
