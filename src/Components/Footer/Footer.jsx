import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaCode,
  FaHeart,
  FaSnapchat 
  
} from 'react-icons/fa'
import styles from './Footer.module.css'

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Pre-generate particle positions to avoid Math.random during render
  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        left: `${(i * 5) % 100}%`,
        animationDelay: `${(i * 0.25) % 5}s`,
        animationDuration: `${3 + ((i * 0.2) % 4)}s`,
      })),
    [],
  );

const quickLinks = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services", path: "/#services" }, 
  { key: "contact", path: "/contact" },
];


  const services = [
    { key: "web", title: t("services.items.web.title") },
    { key: "mobile", title: t("services.items.mobile.title") },
    { key: "erp", title: t("services.items.erp.title") },
    { key: "cybersecurity", title: t("services.items.cybersecurity.title") },
  ];

  const whatsappNumber = '96611'
  const whatsappMessage = isRTL 
    ? 'مرحباً، أريد الاستفسار عن خدماتكم'
    : 'Hello, I would like to inquire about your services'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook", color: "#1877F2" },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/beyonex-it-53a5713a9/",
      label: "LinkedIn",
      color: "#0A66C2",
    },
    {
      icon: FaSnapchat,
      href: "https://www.snapchat.com/add/beyonex.it",
      label: "SnapChat",
      color: "#d1d414",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/beyonex.it/?hl=ar",
      label: "Instagram",
      color: "#E4405F",
    },
    { icon: FaTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: FaWhatsapp, href: whatsappUrl, label: "WhatsApp", color: "#25D366" },
  ];

  return (
    <footer className={styles.footer}>
      {/* Background Image */}
      <div className={styles.backgroundImage}>
        <img
          src="/assets/computer.jpg"
          alt="Footer Background"
          loading="lazy"
          className={`${styles.bgImg} ${isRTL ? styles.flipped : ""}`}
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Animated Particles */}
      <div className={styles.particles}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <div className={styles.logoSection}>
              <div className={styles.logoWrapper}>
                <img
                  src="/assets/4.png"
                  alt="Logo"
                  className={styles.logofooter}
                />
              </div>
            </div>
            <p className={styles.tagline}>{t("footer.tagline")}</p>
            <p className={styles.description}>{t("footer.description")}</p>

            <div className={styles.socialSection}>
              <h4 className={styles.socialTitle}>{t("footer.followUs")}</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={styles.socialLink}
                      aria-label={social.label}
                      style={{ "--social-color": social.color }}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>
              <span className={styles.titleIcon}></span>
              {t("footer.quickLinks")}
            </h4>
      <ul className={styles.linksList}>
  {quickLinks.map((link, index) => (
    <li key={index} className={styles.linkItem}>
      <Link to={link.path} className={styles.link}>
        <FaArrowRight className={styles.linkArrow} />
        <span>{t(`footer.links.${link.key}`)}</span>
      </Link>
    </li>
  ))}
</ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>
              <span className={styles.titleIcon}></span>
              {t("footer.services")}
            </h4>
            <ul className={styles.linksList}>
              {services.map((service, index) => (
                <li key={index} className={styles.linkItem}>
                  <a href="#services" className={styles.link}>
                    <FaArrowRight className={styles.linkArrow} />
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>
              <span className={styles.titleIcon}></span>
              {t("footer.contactInfo")}
            </h4>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FaMapMarkerAlt />
                </div>
                <div className={styles.contactText}>
                  <a href="https://maps.app.goo.gl/hnZvB37xCRWyb1Bw8?g_st=aw" target="_blank" rel="noreferrer">
                    <span>{t("footer.address")}</span>
                  </a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FaPhone />
                </div>
                <div className={styles.contactText}>
                  <a href="tel:+966 11 466 1367" style={{ direction: 'ltr', unicodeBidi: 'embed' }}>{t("footer.phone")}</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FaEnvelope />
                </div>
                <div className={styles.contactText}>
                  <a href="mailto:info@beyonexit.com">{t("footer.email")}</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <FaClock />
                </div>
                <div className={styles.contactText}>
                  <span>{t("footer.workingDays")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.divider}></div>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>{t("footer.copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
