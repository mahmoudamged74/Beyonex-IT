import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { iconMap } from "../../utils/iconMap";

import ServiceCard from "../ServiceCard/ServiceCard";
import styles from "./OurService.module.css";

export default function OurService() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const services = useMemo(
    () => [
      {
        key: "software",
        icon: "code",
        color: "#9C27B0",
        image: "/assets/software.webp",
      },
      // { key: "ui", icon: "palette", color: "#E7B742", image: "/assets/UI.jpg" },
      {
        key: "hardware",
        icon: "server",
        color: "#FF9800",
        image: "/assets/hardware.webp",
      },
      {
        key: "web",
        icon: "laptopCode",
        color: "#E7B742",
        image: "/assets/web.webp",
      },
      {
        key: "mobile",
        icon: "mobileAlt",
        color: "#2196F3",
        image: "/assets/mobile.webp",
      },
      {
        key: "erp",
        icon: "database",
        color: "#4CAF50",
        image: "/assets/erp.webp",
      },
      {
        key: "cybersecurity",
        icon: "shieldAlt",
        color: "#F44336",
        image: "/assets/security.webp",
      },
    ],
    [],
  );

  return (
    <section id="services" ref={sectionRef} className={styles.servicesSection}>
      <div className={styles.backgroundImage}>
        <img
          src="/assets/computer.jpg"
          alt="Programming Background"
          loading="lazy"
          decoding="async"
          className={`${styles.bgImg} ${isRTL ? styles.flipped : ""}`}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ""}`}>
          <h2 className={styles.title}>{t("services.title")}</h2>
          <p className={styles.subtitle}>{t("services.subtitle")}</p>
          <p className={styles.description}>{t("services.description")}</p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.key}
              service={service}
              index={index}
              isVisible={isVisible}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
