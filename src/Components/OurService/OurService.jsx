import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../ServiceCard/ServiceCard";
import styles from "./OurService.module.css";
import { useGetHomeDataQuery } from "../../redux/api/homeApi";

import { useGetSettingsQuery } from "../../redux/api/settingsApi";

// Fixed color palette - cycles for any number of services
const COLOR_PALETTE = [
  "#9C27B0",
  "#FF9800",
  "#E7B742",
  "#2196F3",
  "#4CAF50",
  "#F44336",
  "#00BCD4",
  "#FF5722",
];

export default function OurService() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const lang = i18n.language;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const { data: homeData, isLoading: homeLoading } = useGetHomeDataQuery(lang);
  const { data: settingsData } = useGetSettingsQuery(lang);
  
  const apiServices = homeData?.data?.services || [];
  const serviceText = settingsData?.data?.service_text?.[lang] || settingsData?.data?.service_text || "";
  
  // Split service_text into subtitle and description
  const textParts = serviceText ? serviceText.split(/\r?\n\r?\n/) : [];
  const subtitle = textParts[0] || t("services.subtitle");
  const description = textParts[1] || t("services.description");

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
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.servicesGrid}>
          {homeLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.serviceCardLink}>
                  <div className={`${styles.serviceCard} ${isVisible ? styles.slideUp : ""}`}
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className={styles.serviceImageWrapper}>
                      <div className={styles.imageSkeleton}>
                        <div className={styles.imageSkeletonShimmer} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : apiServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  color={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                  lang={lang}
                  t={t}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
