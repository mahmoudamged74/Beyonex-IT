import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeadingAccent from "../../Components/Common/HeadingAccent/HeadingAccent";
import Icon from "../../Components/Common/Icon.jsx";
import { useSettings } from "../../hooks/useSettings";
import { usePageTitle } from "../../hooks/usePageTitle";
import styles from "./Privacy.module.css";

const SECTION_ICONS = [
  "infoCircle",
  "database",
  "chartBar",
  "shareAlt",
  "globe",
  "shieldCheck",
  "userShield",
  "clock",
];

const HIGHLIGHT_ICONS = ["shieldCheck", "eye", "userShield"];

export default function Privacy() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const sections = t("privacyPage.sections", { returnObjects: true });
  const highlights = t("privacyPage.highlights", { returnObjects: true });

  usePageTitle(t("privacyPage.hero.title"));

  return (
    <div className={styles.privacyPage}>
      <section className={styles.hero}>
        <div className={styles.heroAtmosphere} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{t("privacyPage.hero.title")}</h1>
            <HeadingAccent size="lg" />
            <p className={styles.subtitle}>{t("privacyPage.hero.subtitle")}</p>
          </div>

          {Array.isArray(highlights) && (
            <div className={styles.highlights}>
              {highlights.map((item, index) => (
                <article key={item.title} className={styles.highlightItem}>
                  <div className={styles.highlightIconWrap} aria-hidden="true">
                    <Icon
                      name={HIGHLIGHT_ICONS[index] || "shieldCheck"}
                      className={styles.highlightIcon}
                    />
                  </div>
                  <div className={styles.highlightCopy}>
                    <h2 className={styles.highlightTitle}>{item.title}</h2>
                    <p className={styles.highlightText}>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.document}>
            {Array.isArray(sections) &&
              sections.map((section, index) => (
                <article key={section.title} className={styles.sectionBlock}>
                  <header className={styles.sectionHeader}>
                    <span className={styles.sectionIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.sectionHeading}>
                      <div className={styles.sectionIconWrap} aria-hidden="true">
                        <Icon
                          name={SECTION_ICONS[index] || "infoCircle"}
                          className={styles.sectionIcon}
                        />
                      </div>
                      <h2 className={styles.sectionTitle}>{section.title}</h2>
                    </div>
                  </header>

                  <div className={styles.sectionBody}>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.items?.length > 0 && (
                      <ul className={styles.list}>
                        {section.items.map((item) => (
                          <li key={item}>
                            <span className={styles.listBullet} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} aria-labelledby="privacy-cta-title">
        <div className={styles.ctaAtmosphere} aria-hidden="true" />
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaMark} aria-hidden="true">
              <Icon name="shieldCheck" className={styles.ctaMarkIcon} />
            </div>

            <header className={styles.ctaHeader}>
              <h2 id="privacy-cta-title" className={styles.ctaTitle}>
                {t("privacyPage.ctaTitle")}
              </h2>
              <HeadingAccent size="md" />
              <p className={styles.ctaText}>{t("privacyPage.contactNote")}</p>
            </header>

            <div className={styles.ctaActions}>
              <Link to="/contact" className={styles.ctaPrimary}>
                <span>{t("privacyPage.contactLink")}</span>
                <Icon name="arrowRight" className={styles.ctaPrimaryIcon} />
              </Link>
              <Link to="/start-project" className={styles.ctaSecondary}>
                {t("nav.startProject")}
              </Link>
            </div>

            {(settings?.site_email || settings?.site_phone) && (
              <div className={styles.ctaMeta}>
                {settings?.site_email && (
                  <a
                    href={`mailto:${settings.site_email}`}
                    className={styles.ctaMetaLink}
                  >
                    <Icon name="envelope" className={styles.ctaMetaIcon} />
                    <span>{settings.site_email}</span>
                  </a>
                )}
                {settings?.site_phone && (
                  <a
                    href={`tel:${settings.site_phone}`}
                    className={styles.ctaMetaLink}
                    dir="ltr"
                  >
                    <Icon name="phone" className={styles.ctaMetaIcon} />
                    <span>{settings.site_phone}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
