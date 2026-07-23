import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { iconMap } from "../../Common/iconMap";
import styles from "./AboutStory.module.css";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";
import { useAboutData } from "../../../hooks/useAboutData";
import { useIntersectionReveal } from "../../../hooks/useIntersectionReveal";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import Icon from "../../Common/Icon.jsx";
import {
  getProfessionalJourneyDescription,
  getProfessionalMilestone,
  getProfessionalPillarContent,
  professionalMilestonesByYear,
} from "../../../content/aboutStoryContent";

export default function AboutStory() {
  const { t } = useTranslation();
  const { lang, isLoading, aboutData, aboutPage } = useAboutData();
  const milestones = aboutData?.milestones || [];
  const { isVisible, sectionRef } = useIntersectionReveal({
    deps: [isLoading, lang],
  });
  const milestoneIcons = ["launch", "users", "globe", "trophy", "rocket"];

  const fallbackMilestones = Object.entries(professionalMilestonesByYear).map(
    ([year, content], index) => ({
      id: `f${index + 1}`,
      year: Number(year),
      icon: milestoneIcons[index % milestoneIcons.length],
      title: content.title,
      description: content.description,
      display_order: index,
    }),
  );
  const displayedMilestones = (
    milestones.length > 0 ? milestones : fallbackMilestones
  ).map(getProfessionalMilestone);
  const sortedMilestones = [...displayedMilestones].sort(
    (a, b) => a.display_order - b.display_order,
  );

  const pillars = [
    {
      id: "mission",
      icon:
        aboutPage?.mission_icon && iconMap[aboutPage.mission_icon]
          ? aboutPage.mission_icon
          : "rocket",
      title:
        getLocalizedOrRaw(aboutPage?.mission_title, lang) || t("about.mission"),
      text: getProfessionalPillarContent("mission", lang, t),
    },
    {
      id: "vision",
      icon:
        aboutPage?.vision_icon && iconMap[aboutPage.vision_icon]
          ? aboutPage.vision_icon
          : "eye",
      title:
        getLocalizedOrRaw(aboutPage?.vision_title, lang) || t("about.vision"),
      text: getProfessionalPillarContent("vision", lang, t),
    },
  ];

  return (
    <section ref={sectionRef} className={styles.storySection}>
      <div className="container">
        <SectionHeader
          variant="about"
          className={styles.storyHeader}
          title={
            getLocalizedOrRaw(aboutPage?.journey_title, lang) ||
            t("aboutPage.story.title")
          }
          subtitle={
            getProfessionalJourneyDescription(lang, t)
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
            <div
              className={`${styles.evolutionGraph} ${isVisible ? styles.visible : ""}`}
            >
              <div className={styles.evolutionHeader}>
                <div className={styles.evolutionHeaderCopy}>
                  <span className={styles.evolutionEyebrow}>
                    {lang?.startsWith("ar") ? "مسار النمو" : "Growth Path"}
                  </span>
                  <p className={styles.evolutionHint}>
                    {lang?.startsWith("ar")
                      ? "رحلة تصاعدية من التأسيس إلى منظومة تقنية متكاملة"
                      : "An ascending journey from founding to an integrated technology ecosystem"}
                  </p>
                </div>
                <div className={styles.evolutionMeta}>
                  <span className={styles.evolutionMetaValue}>
                    {sortedMilestones[0]?.year}
                    <span aria-hidden="true">–</span>
                    {sortedMilestones[sortedMilestones.length - 1]?.year}
                  </span>
                  <span className={styles.evolutionMetaLabel}>
                    {lang?.startsWith("ar") ? "مراحل التطور" : "Evolution stages"}
                  </span>
                </div>
              </div>

              <ol className={styles.evolutionSteps}>
                {sortedMilestones.map((milestone, index) => {
                  const iconKey =
                    milestone.icon ||
                    milestoneIcons[index % milestoneIcons.length];
                  const side =
                    index % 2 === 0
                      ? styles.evolutionStepStart
                      : styles.evolutionStepEnd;
                  const total = sortedMilestones.length;

                  return (
                    <li
                      key={milestone.id}
                      className={`${styles.evolutionStep} ${side} ${isVisible ? styles.visible : ""}`}
                      style={{
                        "--step-index": index,
                        animationDelay: `${0.2 + index * 0.1}s`,
                      }}
                    >
                      <div className={styles.evolutionNode} aria-hidden="true">
                        <span className={styles.evolutionNodeRing} />
                        <span className={styles.evolutionNodeCore} />
                        <span className={styles.evolutionNodeIndex}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <article className={styles.evolutionCard}>
                        <header className={styles.evolutionCardHead}>
                          <span className={styles.evolutionYear}>{milestone.year}</span>
                          <div className={styles.evolutionCardIcon}>
                            <Icon
                              name={iconKey}
                              className={styles.evolutionCardIconGlyph}
                            />
                          </div>
                        </header>
                        <div className={styles.evolutionCardBody}>
                          <h4 className={styles.evolutionCardTitle}>
                            {getLocalizedOrRaw(milestone.title, lang)}
                          </h4>
                          <p className={styles.evolutionCardDesc}>
                            {getLocalizedOrRaw(milestone.description, lang)}
                          </p>
                        </div>
                        <div className={styles.evolutionLevel} aria-hidden="true">
                          <span
                            className={styles.evolutionLevelFill}
                            style={{
                              width: `${((index + 1) / total) * 100}%`,
                            }}
                          />
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
