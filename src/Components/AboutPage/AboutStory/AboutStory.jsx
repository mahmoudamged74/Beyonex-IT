import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { iconMap } from "../../Common/iconMap";
import styles from "./AboutStory.module.css";
import AboutSectionHeader from "../shared/AboutSectionHeader";
import { useAboutData } from "../../../hooks/useAboutData";
import { useIntersectionReveal } from "../../../hooks/useIntersectionReveal";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import Icon from "../../Common/Icon.jsx";

export default function AboutStory() {
  const { t } = useTranslation();
  const { lang, isLoading, aboutData, aboutPage } = useAboutData();
  const milestones = aboutData?.milestones || [];
  const { isVisible, sectionRef } = useIntersectionReveal({
    deps: [isLoading, lang],
  });
  const milestoneIcons = ["launch", "users", "globe", "trophy", "rocket"];

  const fallbackMilestones = [
    {
      id: "f1",
      year: 2022,
      icon: "rocket",
      title: { ar: "البداية", en: "The Beginning" },
      description: {
        ar: "تأسست بيونكس IT برؤية لإحداث ثورة في الحلول الرقمية.",
        en: "Beyonex IT was founded with a vision to revolutionize digital solutions.",
      },
      display_order: 0,
    },
    {
      id: "f2",
      year: 2023,
      icon: "users",
      title: { ar: "توسع الفريق", en: "Team Expansion" },
      description: {
        ar: "وسعنا فريقنا بمطورين ومصممين وخبراء تقنية موهوبين.",
        en: "We expanded our team with talented developers, designers, and technical experts.",
      },
      display_order: 1,
    },
    {
      id: "f3",
      year: 2024,
      icon: "globe",
      title: { ar: "الانتشار العالمي", en: "Global Expansion" },
      description: {
        ar: "وسعنا خدماتنا دولياً، لخدمة العملاء في عدة دول.",
        en: "We expanded our services internationally to serve clients in several countries.",
      },
      display_order: 2,
    },
    {
      id: "f4",
      year: 2025,
      icon: "trophy",
      title: { ar: "ريادة الصناعة", en: "Industry Leadership" },
      description: {
        ar: "معترف بنا كمزود رائد لحلول التكنولوجيا.",
        en: "Recognized as a leading provider of technology solutions.",
      },
      display_order: 3,
    },
    {
      id: "f5",
      year: 2026,
      icon: "rocket",
      title: { ar: "نحو المستقبل", en: "Future Forward" },
      description: {
        ar: "نستثمر في الذكاء الاصطناعي والحلول السحابية المتقدمة.",
        en: "Investing in AI and next-generation cloud solutions.",
      },
      display_order: 4,
    },
  ];
  const displayedMilestones =
    milestones.length > 0 ? milestones : fallbackMilestones;

  const pillars = [
    {
      id: "mission",
      icon:
        aboutPage?.mission_icon && iconMap[aboutPage.mission_icon]
          ? aboutPage.mission_icon
          : "rocket",
      title:
        getLocalizedOrRaw(aboutPage?.mission_title, lang) || t("about.mission"),
      text:
        getLocalizedOrRaw(aboutPage?.mission_content, lang) ||
        t("about.missionText"),
    },
    {
      id: "vision",
      icon:
        aboutPage?.vision_icon && iconMap[aboutPage.vision_icon]
          ? aboutPage.vision_icon
          : "eye",
      title:
        getLocalizedOrRaw(aboutPage?.vision_title, lang) || t("about.vision"),
      text:
        getLocalizedOrRaw(aboutPage?.vision_content, lang) ||
        t("about.visionText"),
    },
  ];

  return (
    <section ref={sectionRef} className={styles.storySection}>
      <div className="container">
        <AboutSectionHeader
          className={styles.storyHeader}
          title={
            getLocalizedOrRaw(aboutPage?.journey_title, lang) ||
            t("aboutPage.story.title")
          }
          subtitle={
            getLocalizedOrRaw(aboutPage?.journey_description, lang) ||
            t("aboutPage.story.subtitle")
          }
          isVisible={isVisible}
        />

        <div className={styles.storyContent}>
          <div
            className={`${styles.pillarsPanel} ${isVisible ? styles.visible : ""}`}
          >
            {pillars.map((pillar, index) => (
              <Fragment key={pillar.id}>
                {index > 0 && (
                  <div className={styles.pillarsDivider} aria-hidden="true">
                    <span className={styles.dividerRing} />
                    <span className={styles.dividerGem} />
                  </div>
                )}
                <article
                  className={styles.pillarCard}
                  style={{ "--delay": `${index * 0.1}s` }}
                >
                  <span className={styles.pillarIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.pillarHead}>
                    <div className={styles.pillarIconWrap}>
                      <Icon name={pillar.icon} className={styles.pillarIcon} />
                    </div>
                    <div className={styles.pillarTitleWrap}>
                      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                      <span className={styles.pillarAccent} aria-hidden="true" />
                    </div>
                  </div>
                  <p className={styles.pillarText}>{pillar.text}</p>
                </article>
              </Fragment>
            ))}
          </div>

          {displayedMilestones.length > 0 && (
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />

              {[...displayedMilestones]
                .sort((a, b) => a.display_order - b.display_order)
                .map((milestone, index) => {
                  const iconKey =
                    milestone.icon ||
                    milestoneIcons[index % milestoneIcons.length];
                  return (
                    <div
                      key={milestone.id}
                      className={`${styles.timelineItem} ${isVisible ? styles.visible : ""}`}
                      style={{ animationDelay: `${0.2 + index * 0.12}s` }}
                    >
                      <div className={styles.timelineYear}>
                        {milestone.year}
                      </div>
                      <article className={styles.timelineContent}>
                        <div className={styles.timelineIconWrap}>
                          <Icon name={iconKey} className={styles.nodeIcon} />
                        </div>
                        <div className={styles.timelineBody}>
                          <h4 className={styles.timelineTitle}>
                            {getLocalizedOrRaw(milestone.title, lang)}
                          </h4>
                          <p className={styles.timelineDesc}>
                            {getLocalizedOrRaw(milestone.description, lang)}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
