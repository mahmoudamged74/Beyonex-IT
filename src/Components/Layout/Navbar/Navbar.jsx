import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";
import { useLocale } from "../../../hooks/useLocale";
import { useSettings } from "../../../hooks/useSettings";
import { useResolvedMediaUrl } from "../../../hooks/useResolvedMediaUrl";
import { useTheme } from "../../../hooks/useTheme";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import Icon from "../../Common/Icon.jsx";

const LANGUAGES = [
  {
    code: "ar",
    label: "العربية",
    short: "AR",
    flag: "https://flagcdn.com/w20/sa.png",
    alt: "Saudi Arabia",
  },
  {
    code: "en",
    label: "English",
    short: "EN",
    flag: "https://flagcdn.com/w20/us.png",
    alt: "United States",
  },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLocale();
  const { settings } = useSettings();
  const { theme, isDark, toggleTheme } = useTheme();
  const faviconSrc = useResolvedMediaUrl(settings?.favicon);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  const closeNav = () => {
    setNavOpen(false);
    setDropdownOpen(false);
  };

  const themeToggleButton = (className = "") => (
    <button
      type="button"
      className={`${styles.themeToggle} ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? t("nav.themeLight") : t("nav.themeDark")}
      title={isDark ? t("nav.themeLight") : t("nav.themeDark")}
    >
      <Icon
        name={isDark ? "sunFill" : "moonFill"}
        className={styles.themeToggleIcon}
      />
    </button>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setNavOpen(false);
      }
    };

    if (dropdownOpen || navOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen, navOpen]);

  useEffect(() => {
    if (!navOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [navOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderNavLink = (to, label, options = {}) => (
    <NavLink
      className={({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
      }
      to={to}
      end={options.end}
      onClick={() => {
        options.onClick?.();
        closeNav();
      }}
    >
      {label}
    </NavLink>
  );

  return (
    <nav
      className={`navbar navbar-expand-lg ${styles.navbar} ${
        scrolled ? styles.navbarScrolled : ""
      } ${navOpen ? styles.navbarMenuOpen : ""}`}
      data-theme={theme}
    >
      <div className="container">
        <Link
          className={`navbar-brand ${
            isRTL ? styles.logoRight : styles.logoLeft
          } ${styles.brandLink}`}
          to="/"
        >
          {faviconSrc && (
            <img
              src={faviconSrc}
              alt={
                getLocalizedOrRaw(settings?.site_name, i18n.language) ||
                "Beyonex IT"
              }
              className={styles.siteIcon}
              height={46}
              loading="eager"
              decoding="async"
            />
          )}
        </Link>

        <div className={styles.mobileControls}>
          {themeToggleButton(styles.themeToggleBar)}
          <button
            className={`navbar-toggler ${styles.navbarToggler}`}
            type="button"
            onClick={() => {
              setNavOpen((open) => {
                if (open) setDropdownOpen(false);
                return !open;
              });
            }}
            aria-controls="navbarNav"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
          >
            <span className={`navbar-toggler-icon ${styles.togglerIcon}`}></span>
          </button>
        </div>

        <div
          className={`${styles.navOverlay} ${
            navOpen ? styles.navOverlayVisible : ""
          }`}
          onClick={closeNav}
          aria-hidden="true"
        />

        <div
          className={`navbar-collapse ${styles.navCollapse} ${
            isRTL ? styles.navSidebarRtl : styles.navSidebarLtr
          } ${navOpen ? styles.navCollapseOpen : styles.navCollapseClosed}`}
          id="navbarNav"
        >
          <div className={styles.sidebarHeader}>
            {faviconSrc ? (
              <img
                src={faviconSrc}
                alt={
                  getLocalizedOrRaw(settings?.site_name, i18n.language) ||
                  "Beyonex IT"
                }
                className={styles.sidebarLogo}
                loading="eager"
                decoding="async"
              />
            ) : (
              <span className={styles.sidebarTitle}>
                {getLocalizedOrRaw(settings?.site_name, i18n.language) ||
                  "Beyonex IT"}
              </span>
            )}
            <button
              type="button"
              className={styles.sidebarClose}
              onClick={closeNav}
              aria-label={isRTL ? "إغلاق القائمة" : "Close menu"}
            >
              <Icon name="times" className={styles.sidebarCloseIcon} />
            </button>
          </div>

          {/* Navigation Links - Center */}
          <ul className={`navbar-nav ${styles.navLinks}`}>
            <li className="nav-item">
              {renderNavLink("/", t("nav.home"), { end: true })}
            </li>
            <li className="nav-item">
              {renderNavLink("/about", t("nav.about"))}
            </li>
            <li className="nav-item">
              {renderNavLink("/services", t("nav.services"), {
                onClick: () => window.scrollTo(0, 0),
              })}
            </li>
            <li className="nav-item">
              {renderNavLink("/contact", t("nav.contact"))}
            </li>
          </ul>

          {/* Language & Book Appointment - Left in Arabic, Right in English */}
          <div
            className={`${styles.actionsContainer} ${
              isRTL ? styles.actionsLeft : styles.actionsRight
            }`}
          >
            {themeToggleButton(styles.themeToggleDesktop)}
            <div className={styles.langSelect} ref={dropdownRef}>
              <button
                type="button"
                className={`${styles.langTrigger} ${
                  dropdownOpen ? styles.langOpen : ""
                }`}
                onClick={() => setDropdownOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                aria-label={i18n.language === "ar" ? "اللغة" : "Language"}
              >
                <span className={styles.langTriggerContent}>
                  <img
                    src={currentLanguage.flag}
                    alt={currentLanguage.alt}
                    className={styles.flagIcon}
                  />
                  <span className={styles.langLabel}>
                    {currentLanguage.label}
                  </span>
                  <span className={styles.langShort}>
                    {currentLanguage.short}
                  </span>
                </span>
                <Icon name="chevronDown" className={styles.langChevron} />
              </button>

              {dropdownOpen && (
                <ul className={styles.langMenu} role="listbox">
                  {LANGUAGES.map((lang) => {
                    const isActive = i18n.language === lang.code;

                    return (
                      <li
                        key={lang.code}
                        role="option"
                        aria-selected={isActive}
                      >
                        <button
                          type="button"
                          className={`${styles.langMenuItem} ${
                            isActive ? styles.langMenuItemActive : ""
                          }`}
                          onClick={() => changeLanguage(lang.code)}
                        >
                          <span className={styles.langOptionContent}>
                            <img
                              src={lang.flag}
                              alt={lang.alt}
                              className={styles.flagIcon}
                            />
                            <span>{lang.label}</span>
                          </span>
                          {isActive && (
                            <Icon name="check" className={styles.langCheck} />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <Link
              to="/start-project"
              className={styles.bookBtn}
              onClick={closeNav}
            >
              {t("nav.startProject")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
