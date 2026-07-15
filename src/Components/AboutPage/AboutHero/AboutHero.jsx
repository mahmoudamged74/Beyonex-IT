import { useTranslation } from "react-i18next";
import styles from "./AboutHero.module.css";
import { useAboutData } from "../../../hooks/useAboutData";
import { useResolvedMediaUrl } from "../../../hooks/useResolvedMediaUrl";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import HeadingAccent from "../../Common/HeadingAccent/HeadingAccent.jsx";

export default function AboutHero() {
  const { t } = useTranslation();
  const { lang, aboutPage } = useAboutData();
  const logoSrc = useResolvedMediaUrl(aboutPage?.logo_path);

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.content}`}>
        <div
          className={`${styles.heroContent} ${styles.visible}`}
        >
          <div className={styles.logoSlot}>
            {logoSrc && (
              <img
                src={logoSrc}
                alt="BEYONEX IT Logo"
                className={styles.logo}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            )}
          </div>

          <div className={styles.textBlock}>
            <h1 className={styles.title}>
              {getLocalizedOrRaw(aboutPage?.hero_title, lang) ||
                t("aboutPage.hero.title")}
            </h1>
            <HeadingAccent size="lg" />
            <p className={styles.description}>
              {getLocalizedOrRaw(aboutPage?.hero_description, lang) ||
                t("aboutPage.hero.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
