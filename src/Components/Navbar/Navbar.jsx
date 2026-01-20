import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className={`navbar navbar-expand-lg  ${styles.navbar}`}
    >
      <div className="container">
        <Link
          className={`navbar-brand ${
            isRTL ? styles.logoRight : styles.logoLeft
          }`}
          to="/"
        >
          <img
            src="/assets/4.png"
            alt="Beyonexit Project"
            className={styles.logoImage}
          />
        </Link>

        <button
          className={`navbar-toggler ${styles.navbarToggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${styles.togglerIcon}`}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Links - Center */}
          <ul className={`navbar-nav ${styles.navLinks}`}>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} ${styles.navLink}`
                }
                to="/"
              >
                {t("nav.home")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} ${styles.navLink}`
                }
                to="/about"
              >
                {t("nav.about")}
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${styles.navLink}`} to="/#services">
                {t("services.title")}
              </Link>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} ${styles.navLink}`
                }
                to="/contact"
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
            <div className="nav-item dropdown" ref={dropdownRef}>
              <button
                className={`btn btn-outline-light dropdown-toggle ${styles.langBtn}`}
                type="button"
                id="languageDropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                <span className={styles.langContent}>
                  {i18n.language === "ar" ? (
                    <>
                      <img
                        src="https://flagcdn.com/w20/sa.png"
                        alt="Saudi Arabia"
                        className={styles.flagIcon}
                      />
                      <span>AR</span>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://flagcdn.com/w20/us.png"
                        alt="United States"
                        className={styles.flagIcon}
                      />
                      <span>EN</span>
                    </>
                  )}
                </span>
              </button>
              <ul
                className={`dropdown-menu ${styles.dropdownMenu} ${
                  dropdownOpen ? "show" : ""
                }`}
                aria-labelledby="languageDropdown"
              >
                <li>
                  <button
                    className={`dropdown-item ${styles.langOption} ${
                      i18n.language === "ar" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("ar")}
                  >
                    <span className={styles.langOptionContent}>
                      <img
                        src="https://flagcdn.com/w20/sa.png"
                        alt="Saudi Arabia"
                        className={styles.flagIcon}
                      />
                      <span>العربية</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${styles.langOption} ${
                      i18n.language === "en" ? "active" : ""
                    }`}
                    onClick={() => changeLanguage("en")}
                  >
                    <span className={styles.langOptionContent}>
                      <img
                        src="https://flagcdn.com/w20/us.png"
                        alt="United States"
                        className={styles.flagIcon}
                      />
                      <span>English</span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
            {/* <button className={`btn btn-primary ${styles.bookBtn}`}>
              {t("nav.bookAppointment")}
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
