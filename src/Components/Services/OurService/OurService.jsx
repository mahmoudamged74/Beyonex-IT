import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ServiceCard from "../ServiceCard/ServiceCard";
import styles from "./OurService.module.css";
import { useGetServicesQuery } from "../../../redux/api/servicesApi";
import { COLOR_PALETTE } from "../../../Styles/colors";
import { useLocale } from "../../../hooks/useLocale";
import { useSettings } from "../../../hooks/useSettings";
import { useHomeData } from "../../../hooks/useHomeData";
import { useIntersectionReveal } from "../../../hooks/useIntersectionReveal";
import Icon from "../../Common/Icon.jsx";
import HeadingAccent from "../../Common/HeadingAccent/HeadingAccent.jsx";

export default function OurService({ limit, showViewMore = false }) {
  const { t } = useTranslation();
  const { lang } = useLocale();
  const { isVisible, sectionRef } = useIntersectionReveal({ threshold: 0.12, once: true });
  const { settings } = useSettings();
  const { services: homeServices } = useHomeData();

  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery(lang);
  const apiServices = servicesData?.data?.length
    ? servicesData.data
    : homeServices?.length
      ? homeServices
      : [];
  const displayedServices = limit ? apiServices.slice(0, limit) : apiServices;
  const skeletonCount = limit || 6;
  const showSkeletons = servicesLoading && apiServices.length === 0;
  const firstServiceImage = displayedServices[0]?.image;
  const showHeaderImmediately = !limit;
  const serviceText = settings?.service_text?.[lang] || settings?.service_text || "";

  const textParts = serviceText ? serviceText.split(/\r?\n\r?\n/) : [];
  const subtitle = textParts[0] || t("services.subtitle");
  const description = textParts[1] || t("services.description");

  useEffect(() => {
    if (limit || !firstServiceImage || window.matchMedia('(max-width: 768px)').matches) {
      return undefined
    }

    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = firstServiceImage;
    preloadLink.fetchPriority = "high";
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [firstServiceImage, limit]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`${styles.servicesSection} ${!limit ? styles.fullPage : ""}`}
    >
      <div className={styles.backgroundImage}>
        <div className={styles.overlay} />
        <div className={styles.colorGrade} aria-hidden="true" />
        <div className={styles.gridPattern} aria-hidden="true" />
        {!limit && <div className={styles.noiseOverlay} aria-hidden="true" />}
      </div>

      {!limit && <div className={styles.topGlow} aria-hidden="true" />}

      <div className="container">
        <div className={`${styles.header} ${showHeaderImmediately || isVisible ? styles.fadeIn : ""}`}>
          {limit ? (
            <h2 className={styles.title}>{t("services.title")}</h2>
          ) : (
            <h1 className={styles.title}>{t("services.title")}</h1>
          )}
          <HeadingAccent size="md" />

          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.servicesGrid}>
          {showSkeletons
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}>
                    <div className={styles.imageSkeletonShimmer} />
                  </div>
                  <div className={styles.skeletonBody}>
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLineShort} />
                  </div>
                </div>
              ))
            : displayedServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  prioritizeImage={Boolean(limit)}
                  color={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                  lang={lang}
                  t={t}
                />
              ))}
        </div>

        {showViewMore && !showSkeletons && apiServices.length > (limit || 0) && (
          <div className={`${styles.viewMoreWrapper} ${isVisible ? styles.fadeIn : ""}`}>
            <Link to="/services" className={styles.viewMoreBtn} onClick={() => window.scrollTo(0, 0)}>
              <span className={styles.viewMoreInner}>
                <span className={styles.viewMoreLabel}>{t("common.showMore")}</span>
                <span className={styles.viewMoreIconWrap}>
                  <Icon name="arrowRight" className={styles.viewMoreIcon} />
                </span>
              </span>
              <span className={styles.viewMoreShine} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
