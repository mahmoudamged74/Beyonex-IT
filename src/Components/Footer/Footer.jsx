import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { iconMap } from "../../utils/iconMap";
import styles from './Footer.module.css'
import { useGetSettingsQuery } from "../../redux/api/settingsApi";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  const { data: settingsResponse, isLoading } = useGetSettingsQuery(i18n.language);
  const settings = settingsResponse?.data;

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

  const socialLinks = useMemo(() => {
    if (!settings) return [];
    
    const platforms = [
      { key: "facebook", icon: "facebook", label: "Facebook", color: "#1877F2" },
      { key: "linkedin", icon: "linkedin", label: "LinkedIn", color: "#0A66C2" },
      { key: "snapchat", icon: "snapchat", label: "SnapChat", color: "#d1d414" },
      { key: "instagram", icon: "instagram", label: "Instagram", color: "#E4405F" },
      { key: "twitter", icon: "twitter", label: "X (Twitter)", color: "#000000" },
      { key: "whatsapp", icon: "whatsapp", label: "WhatsApp", color: "#25D366" },
      { key: "telegram", icon: "paperPlane", label: "Telegram", color: "#0088cc" },
      { key: "tiktok", icon: "tiktok", label: "TikTok", color: "#000000" },
    ];

    return platforms
      .filter(p => settings[p.key])
      .map(p => ({
        ...p,
        href: p.key === "whatsapp" && !settings[p.key].startsWith("http")
          ? `https://wa.me/${settings[p.key].replace(/\+/g, '')}`
          : settings[p.key]
      }));
  }, [settings]);

  if (isLoading) return null; 

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
                  src={settings?.logo || "/assets/4.png"}
                  alt={settings?.site_name?.[i18n.language] || "Logo"}
                  className={styles.logofooter}
                />
              </div>
            </div>
            <p className={styles.tagline}>{t("footer.tagline")}</p>
            <p className={styles.description}>
              {settings?.site_desc?.[i18n.language] || t("footer.description")}
            </p>

            <div className={styles.socialSection}>
              <h4 className={styles.socialTitle}>{t("footer.followUs")}</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => {
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialLink}
                      aria-label={social.label}
                      style={{ "--social-color": social.color }}
                    >
                      {iconMap[social.icon] && React.createElement(iconMap[social.icon])}
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
        {iconMap.arrowRight && React.createElement(iconMap.arrowRight, { className: styles.linkArrow })}
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
                    {iconMap.arrowRight && React.createElement(iconMap.arrowRight, { className: styles.linkArrow })}
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
              {settings?.site_address?.[i18n.language] && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    {iconMap.mapMarker && React.createElement(iconMap.mapMarker)}
                  </div>
                  <div className={styles.contactText}>
                    <a href={settings.location_url || "#"} target="_blank" rel="noreferrer">
                      <span>{settings.site_address[i18n.language]}</span>
                    </a>
                  </div>
                </div>
              )}

              {settings?.site_phone && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    {iconMap.phone && React.createElement(iconMap.phone)}
                  </div>
                  <div className={styles.contactText}>
                    <a href={`tel:${settings.site_phone}`} style={{ direction: 'ltr', unicodeBidi: 'embed' }}>
                      {settings.site_phone}
                    </a>
                  </div>
                </div>
              )}

              {settings?.site_email && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    {iconMap.envelope && React.createElement(iconMap.envelope)}
                  </div>
                  <div className={styles.contactText}>
                    <a href={`mailto:${settings.site_email}`}>{settings.site_email}</a>
                  </div>
                </div>
              )}

              {settings?.working_hours?.[i18n.language] && (
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    {iconMap.clock && React.createElement(iconMap.clock)}
                  </div>
                  <div className={styles.contactText}>
                    <span>{settings.working_hours[i18n.language]}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.divider}></div>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} {settings?.site_name?.[i18n.language] || "Beyonex IT"}. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
