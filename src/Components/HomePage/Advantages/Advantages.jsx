import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Advantages.module.css";
import { useHomeData } from "../../../hooks/useHomeData";
import { useLocale } from "../../../hooks/useLocale";
import { useIntersectionReveal } from "../../../hooks/useIntersectionReveal";
import { getLocalized } from "../../../utils/i18nHelpers";
import { iconMap } from "../../Common/iconMap";
import SectionHeader from "../../Common/SectionHeader/SectionHeader.jsx";

const fallbackIcons = ["rocket", "code", "headset", "cogs", "lightbulb", "shieldAlt"];
const fallbackKeys = ["innovation", "quality", "support", "experience", "customization", "security"];

export default function Advantages({ variant }) {
  const isHome = variant === "home";
  const { t } = useTranslation();
  const { lang } = useLocale();
  const { whyUs } = useHomeData();
  const { isVisible, sectionRef } = useIntersectionReveal({ threshold: 0.12, once: true });

  const fallbackItems = useMemo(
    () =>
      fallbackKeys.map((key, index) => ({
        id: key,
        icon: fallbackIcons[index],
        title: {
          ar: t(`advantages.items.${key}.title`),
          en: t(`advantages.items.${key}.title`),
        },
        description: {
          ar: t(`advantages.items.${key}.description`),
          en: t(`advantages.items.${key}.description`),
        },
      })),
    [t],
  );

  const items = whyUs.length > 0 ? whyUs : fallbackItems;

  return (
    <section
      ref={sectionRef}
      className={`${styles.advantagesSection} ${isHome ? styles.homeLayout : ""}`}
      id="advantages"
    >
      <div className={styles.backgroundImage}>
        <div className={styles.overlay} />
        <div className={styles.gridPattern} aria-hidden="true" />
      </div>

      <div className="container">
        <SectionHeader
          isHome={isHome}
          showEyebrow={!isHome}
          eyebrow={t("advantages.label")}
          title={t("advantages.title")}
          accentSize="md"
          subtitle={t("advantages.subtitle")}
          isVisible={isVisible}
          moduleStyles={styles}
        />

        <div className={`${styles.grid} ${isVisible ? styles.visible : ""}`}>
          {items.map((item, index) => {
            const iconKey = item.icon || fallbackIcons[index % fallbackIcons.length];
            const Icon = iconMap[iconKey] || iconMap.starFill;
            const title = getLocalized(item.title, lang);
            const description = getLocalized(item.description, lang);

            return (
              <article
                key={item.id ?? index}
                className={styles.card}
                style={{ "--delay": `${index * 0.08}s` }}
              >
                {isHome ? (
                  <>
                    <span className={styles.cardWatermark} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.cardHead}>
                      <div className={styles.iconWrap}>
                        <Icon className={styles.icon} />
                      </div>
                      <h3 className={styles.cardTitle}>{title}</h3>
                    </div>
                    <p className={styles.cardDescription}>{description}</p>
                  </>
                ) : (
                  <>
                    <div className={styles.iconWrap}>
                      <Icon className={styles.icon} />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{title}</h3>
                      <p className={styles.cardDescription}>{description}</p>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
