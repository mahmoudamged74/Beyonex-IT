import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import { useLocale } from "../../../hooks/useLocale";
import { useSettings } from "../../../hooks/useSettings";
import { useResolvedMediaUrl } from "../../../hooks/useResolvedMediaUrl";
import { buildFooterSocialLinks } from "../../../utils/socialLinks";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import Icon from "../../Common/Icon.jsx";

function isQuickLinkActive(key, path, { pathname, hash }) {
  const currentHash = hash || "";

  if (key === "home") {
    return pathname === "/" && currentHash !== "#services";
  }

  if (key === "services") {
    return pathname === "/services" || pathname.startsWith("/services/");
  }

  if (path.includes("#")) {
    const [pathnamePart, hashPart] = path.split("#");
    return pathname === pathnamePart && currentHash === `#${hashPart}`;
  }

  return pathname === path;
}

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const { lang } = useLocale();
  const { settings, isLoading: settingsLoading } = useSettings();
  const logoSrc = useResolvedMediaUrl(settings?.logo);
  const siteName =
    getLocalizedOrRaw(settings?.site_name, lang) || t("footer.companyName");

  const quickLinks = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "services", path: "/services" },
    { key: "contact", path: "/contact" },
    { key: "startProject", path: "/start-project" },
    { key: "privacy", path: "/privacy" },
  ];

  const socialLinks = useMemo(
    () => buildFooterSocialLinks(settings),
    [settings],
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLogoClick = useCallback(
    (event) => {
      if (location.pathname === "/" && location.hash !== "#services") {
        event.preventDefault();
        scrollToTop();
      }
    },
    [location.pathname, location.hash, scrollToTop],
  );

  const handleQuickLinkClick = useCallback(
    (event, link) => {
      if (isQuickLinkActive(link.key, link.path, location)) {
        event.preventDefault();
        scrollToTop();
      }
    },
    [location, scrollToTop],
  );

  const handleBottomLinkClick = useCallback(
    (event, path) => {
      if (location.pathname === path) {
        event.preventDefault();
        scrollToTop();
      }
    },
    [location.pathname, scrollToTop],
  );

  if (settingsLoading) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.topGlow} aria-hidden="true" />

      <div className={styles.backgroundImage} aria-hidden="true">
        <div className={styles.imageVignette} />
        <div className={styles.overlay} />
        <div className={styles.noiseOverlay} />
      </div>

      <div className="container-fluid">
        <div className={styles.footerMain}>
          <div className={styles.footerBrandTop}>
            {logoSrc && (
              <NavLink
                to="/"
                end
                className={styles.logoWrapper}
                onClick={handleLogoClick}
              >
                <img src={logoSrc} alt={siteName} className={styles.siteLogo} />
              </NavLink>
            )}

            <div className={styles.brandCopy}>
              <p className={styles.description}>
                {getLocalizedOrRaw(settings?.site_desc, lang) ||
                  t("footer.description")}
              </p>
            </div>
          </div>

          <div className={styles.footerColumns}>
            <nav
              className={styles.footerColumn}
              aria-label={t("footer.quickLinks")}
            >
              <h4 className={styles.columnTitle}>
                <span className={styles.titleAccent} />
                {t("footer.quickLinks")}
              </h4>

              <ul className={styles.linksList}>
                {quickLinks.map((link) => (
                  <li key={link.key} className={styles.linkItem}>
                    <Link
                      to={link.path}
                      className={styles.link}
                      onClick={(event) => handleQuickLinkClick(event, link)}
                    >
                      <span>{t(`footer.links.${link.key}`)}</span>
                      <Icon name="arrowRight" className={styles.linkArrow} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

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
                      <span>{settings.working_hours[lang]}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className={styles.footerColumn}>
                <h4 className={styles.columnTitle}>
                  <span className={styles.titleAccent} />
                  {t("footer.followUs")}
                </h4>

                <ul className={styles.socialLinks}>
                  {socialLinks.map((social) => (
                    <li key={social.key} className={styles.socialItem}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.socialLink}
                        aria-label={t(`footer.social.${social.key}`)}
                        style={{ "--social-color": social.color }}
                      >
                        <span className={styles.socialIconWrap}>
                          <Icon name={social.icon} />
                        </span>
                        <span className={styles.socialLabel}>
                          {t(`footer.social.${social.key}`)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.divider} />

          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} {siteName}.{" "}
              {t("footer.rightsReserved")}
            </p>

            <div className={styles.bottomLinks}>
              <Link
                to="/contact"
                className={`${styles.bottomLink} ${location.pathname === "/contact" ? styles.bottomLinkActive : ""}`.trim()}
                aria-current={
                  location.pathname === "/contact" ? "page" : undefined
                }
                onClick={(event) => handleBottomLinkClick(event, "/contact")}
              >
                {t("footer.links.contact")}
              </Link>
              <span className={styles.bottomDot} aria-hidden="true" />
              <Link
                to="/start-project"
                className={`${styles.bottomLink} ${location.pathname === "/start-project" ? styles.bottomLinkActive : ""}`.trim()}
                aria-current={
                  location.pathname === "/start-project" ? "page" : undefined
                }
                onClick={(event) =>
                  handleBottomLinkClick(event, "/start-project")
                }
              >
                {t("footer.links.startProject")}
              </Link>
              <span className={styles.bottomDot} aria-hidden="true" />
              <Link
                to="/privacy"
                className={`${styles.bottomLink} ${location.pathname === "/privacy" ? styles.bottomLinkActive : ""}`.trim()}
                aria-current={
                  location.pathname === "/privacy" ? "page" : undefined
                }
                onClick={(event) => handleBottomLinkClick(event, "/privacy")}
              >
                {t("footer.links.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
