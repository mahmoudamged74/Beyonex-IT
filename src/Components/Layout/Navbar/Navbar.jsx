import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";
import { useLocale } from "../../../hooks/useLocale";
import { useSettings } from "../../../hooks/useSettings";
import { useResolvedMediaUrl } from "../../../hooks/useResolvedMediaUrl";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import Icon from '../../Common/Icon.jsx';

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
  const faviconSrc = useResolvedMediaUrl(settings?.favicon);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${styles.navbar} ${
        navOpen ? styles.navbarMenuOpen : ""
      }`}
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
              alt={getLocalizedOrRaw(settings?.site_name, i18n.language) || "Beyonex IT"}
              className={styles.siteIcon}
              height={46}
              loading="eager"
              decoding="async"
            />
          )}
        </Link>

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

        <div
          className={`collapse navbar-collapse ${styles.navCollapse} ${
            navOpen ? styles.navCollapseOpen : styles.navCollapseClosed
          }`}
          id="navbarNav"
        >
          {/* Navigation Links - Center */}
          <ul className={`navbar-nav ${styles.navLinks}`}>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                to="/"
                end
                onClick={() => setNavOpen(false)}
              >
                {t("nav.home")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                to="/about"
                onClick={() => setNavOpen(false)}
              >
                {t("nav.about")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                to="/services"
                onClick={() => {
                  window.scrollTo(0, 0)
                  setNavOpen(false)
                }}
              >
                {t("nav.services")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
                to="/contact"
                onClick={() => setNavOpen(false)}
              >
                {t("nav.contact")}
              </NavLink>
            </li>
          </ul>

          {/* Language & Book Appointment - Left in Arabic, Right in English */}
          <div
            className={`${styles.actionsContainer} ${
              isRTL ? styles.actionsLeft : styles.actionsRight
            }`}
          >
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
                  <span>{currentLanguage.short}</span>
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
            <Link to="/start-project" className={styles.bookBtn}>
              {t("nav.startProject")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
