import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./AboutUS.module.css";
import { useHomeData } from "../../../hooks/useHomeData";
import { useLocale } from "../../../hooks/useLocale";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import { useIntersectionReveal } from "../../../hooks/useIntersectionReveal";
import Icon from "../../Common/Icon.jsx";
import HeadingAccent from "../../Common/HeadingAccent/HeadingAccent.jsx";

export default function AboutUS() {
  const { t } = useTranslation();
  const { lang } = useLocale();
  const { about } = useHomeData();
  const { isVisible, sectionRef } = useIntersectionReveal({
    threshold: 0.12,
    once: true,
  });

  const description =
    getLocalizedOrRaw(about?.text, lang) || t("about.description");

  const pillars = useMemo(
    () => [
      {
        id: "mission",
        icon: "rocket",
        index: "01",
        title: t("about.mission"),
        text:
          getLocalizedOrRaw(about?.mission, lang) || t("about.missionText"),
      },
      {
        id: "vision",
        icon: "lightbulb",
        index: "02",
        title: t("about.vision"),
        text: getLocalizedOrRaw(about?.vision, lang) || t("about.visionText"),
      },
    ],
    [about, lang, t],
  );

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="about">
      <div className={styles.backgroundImage}>
        <div className={styles.overlay} />
        <div className={styles.colorGrade} aria-hidden="true" />
        <div className={styles.gridPattern} aria-hidden="true" />
        <div className={styles.noiseOverlay} aria-hidden="true" />
      </div>

      <div className={styles.topGlow} aria-hidden="true" />

      <div className="container">
        <header className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>{t("about.title")}</h2>
          <HeadingAccent size="md" />
          <h3 className={styles.subtitle}>{t("about.subtitle")}</h3>
          <p className={styles.description}>{description}</p>
        </header>

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
                style={{ "--delay": `${index * 0.12}s` }}
              >
                <span className={styles.pillarBgNumber}>{pillar.index}</span>
                <div className={styles.pillarHead}>
                  <div className={styles.pillarIconWrap}>
                    <Icon name={pillar.icon} className={styles.pillarIcon} />
                  </div>
                  <div className={styles.pillarTitleWrap}>
                    <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                    <span className={styles.pillarAccent} aria-hidden="true" />
                  </div>
                </div>
                <p className={styles.pillarText}>{pillar.text}</p>
              </article>
            </Fragment>
          ))}
        </div>

        <div className={`${styles.ctaWrap} ${isVisible ? styles.visible : ""}`}>
          <Link to="/about" className={styles.aboutBtn}>
            <span className={styles.aboutBtnInner}>
              <span>{t("about.readMore")}</span>
              <span className={styles.aboutBtnIconWrap}>
                <Icon name="arrowRight" className={styles.aboutBtnIcon} />
              </span>
            </span>
            <span className={styles.aboutBtnShine} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
