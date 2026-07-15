import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useGetServicesQuery } from "../../../redux/api/servicesApi";
import { useLocale } from "../../../hooks/useLocale";
import { useSettings } from "../../../hooks/useSettings";
import { useHomeData } from "../../../hooks/useHomeData";
import { useResolvedMediaUrl } from "../../../hooks/useResolvedMediaUrl";
import { buildFooterSocialLinks } from "../../../utils/socialLinks";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import Icon from "../../Common/Icon.jsx";

export default function Footer() {
  const { t } = useTranslation();
  const { lang, isRTL } = useLocale();
  const { settings, isLoading: settingsLoading } = useSettings();
  const { hero } = useHomeData();
  const [loadedUrl, setLoadedUrl] = useState(null);
  const faviconSrc = useResolvedMediaUrl(settings?.favicon);
  const sectionBg = useResolvedMediaUrl(hero?.image);
  const imageLoaded = Boolean(sectionBg && loadedUrl === sectionBg);

  const { data: servicesResponse } = useGetServicesQuery(lang);

  const apiServices =
    servicesResponse?.data ||
    (Array.isArray(servicesResponse) ? servicesResponse : []);

  const quickLinks = [
    { key: "home", path: "/" },

    { key: "about", path: "/about" },

    { key: "services", path: "/#services" },

    { key: "contact", path: "/contact" },

    { key: "startProject", path: "/start-project" },
  ];

  const services =
    apiServices.length > 0
      ? apiServices.slice(0, 6)
      : [
          { key: "web", title: t("services.items.web.title"), slug: "web" },

          {
            key: "mobile",

            title: t("services.items.mobile.title"),

            slug: "mobile",
          },

          { key: "erp", title: t("services.items.erp.title"), slug: "erp" },

          {
            key: "cybersecurity",

            title: t("services.items.cybersecurity.title"),

            slug: "cybersecurity",
          },
        ];

  const socialLinks = useMemo(
    () => buildFooterSocialLinks(settings),

    [settings],
  );

  if (settingsLoading) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.topGlow} aria-hidden="true" />

      <div className={styles.backgroundImage}>
        {sectionBg && (
          <div
            className={`${styles.bgStage} ${imageLoaded ? styles.bgStageLoaded : ""}`}
          >
            <img
              src={sectionBg}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`${styles.bgImgBlur} ${isRTL ? styles.flipped : ""}`}
            />
            <img
              src={sectionBg}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`${styles.bgImg} ${isRTL ? styles.flipped : ""}`}
              onLoad={() => setLoadedUrl(sectionBg)}
            />
          </div>
        )}
        <div className={styles.imageVignette} aria-hidden="true" />
        <div className={styles.colorGrade} aria-hidden="true" />
        <div className={styles.overlay} />
        <div className={styles.noiseOverlay} aria-hidden="true" />
        <div className={styles.gridPattern} aria-hidden="true" />
      </div>

      <div className="container">
        <div className={styles.footerContent}>
          <div className={`${styles.footerColumn} ${styles.brandColumn}`}>
            {faviconSrc && (
              <div className={styles.logoWrapper}>
                <img
                  src={faviconSrc}
                  alt={getLocalizedOrRaw(settings?.site_name, lang) || "Beyonex IT"}
                  className={styles.siteIcon}
                />
              </div>
            )}

            <p className={styles.tagline}>{t("footer.tagline")}</p>

            <p className={styles.description}>
              {getLocalizedOrRaw(settings?.site_desc, lang) ||
                t("footer.description")}
            </p>

            {socialLinks.length > 0 && (
              <div className={styles.socialSection}>
                <h4 className={styles.socialTitle}>{t("footer.followUs")}</h4>

                <div className={styles.socialLinks}>
                  {socialLinks.map((social) => (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialLink}
                      aria-label={social.label}
                      style={{ "--social-color": social.color }}
                    >
                      <Icon name={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>
              <span className={styles.titleAccent} />

              {t("footer.quickLinks")}
            </h4>

            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.key} className={styles.linkItem}>
                  <Link to={link.path} className={styles.link}>
                    <span className={styles.linkDot} />

                    <span>{t(`footer.links.${link.key}`)}</span>

                    <Icon name="arrowRight" className={styles.linkArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>
              <span className={styles.titleAccent} />

              {t("footer.services")}
            </h4>

            <ul className={styles.linksList}>
              {services.map((service, index) => (
                <li
                  key={service.slug || service.key || index}
                  className={styles.linkItem}
                >
                  <Link
                    to={`/services/${service.slug || service.key}`}
                    className={styles.link}
                  >
                    <span className={styles.linkDot} />

                    <span>{getLocalizedOrRaw(service.title, lang)}</span>

                    <Icon name="arrowRight" className={styles.linkArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>
              <span className={styles.titleAccent} />

              {t("footer.contactInfo")}
            </h4>

            <div className={styles.contactList}>
              {settings?.site_address?.[lang] && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Icon name="mapMarker" />
                  </div>

                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>
                      {t("footer.addressLabel")}
                    </span>

                    <a
                      href={settings.location_url || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {settings.site_address[lang]}
                    </a>
                  </div>
                </div>
              )}

              {settings?.site_phone && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Icon name="phone" />
                  </div>

                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>
                      {t("footer.phoneLabel")}
                    </span>

                    <a
                      href={`tel:${settings.site_phone}`}
                      style={{ direction: "ltr", unicodeBidi: "embed" }}
                    >
                      {settings.site_phone}
                    </a>
                  </div>
                </div>
              )}

              {settings?.site_email && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Icon name="envelope" />
                  </div>

                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>
                      {t("footer.emailLabel")}
                    </span>

                    <a href={`mailto:${settings.site_email}`}>
                      {settings.site_email}
                    </a>
                  </div>
                </div>
              )}

              {settings?.working_hours?.[lang] && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <Icon name="clock" />
                  </div>

                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>
                      {t("footer.workingHours")}
                    </span>

                    <span>{settings.working_hours[lang]}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.divider} />

          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()}{" "}
              {getLocalizedOrRaw(settings?.site_name, lang)}
            </p>

            <div className={styles.bottomLinks}>
              <Link to="/contact" className={styles.bottomLink}>
                {t("footer.links.contact")}
              </Link>

              <span className={styles.bottomDot} aria-hidden="true" />

              <Link to="/start-project" className={styles.bottomLink}>
                {t("footer.links.startProject")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
