import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Advantages.module.css";
import { useHomeData } from "../../../hooks/useHomeData";
import { useLocale } from "../../../hooks/useLocale";
import { useIntersectionReveal } from "../../../hooks/useIntersectionReveal";
import { getLocalized } from "../../../utils/i18nHelpers";
import { iconMap } from "../../Common/iconMap";
import HeadingAccent from "../../Common/HeadingAccent/HeadingAccent.jsx";

const fallbackIcons = ["rocket", "code", "headset", "cogs", "lightbulb", "shieldAlt"];
const fallbackKeys = ["innovation", "quality", "support", "experience", "customization", "security"];

export default function Advantages() {
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
    <section ref={sectionRef} className={styles.advantagesSection} id="advantages">
      <div className={styles.backgroundImage}>
        <div className={styles.overlay} />
        <div className={styles.gridPattern} aria-hidden="true" />
      </div>

      <div className="container">
        <header className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>{t("advantages.title")}</h2>
          <HeadingAccent size="md" />
          <p className={styles.subtitle}>{t("advantages.subtitle")}</p>
        </header>

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
                <div className={styles.iconWrap}>
                  <Icon className={styles.icon} />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDescription}>{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
