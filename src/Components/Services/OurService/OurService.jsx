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
import SectionHeader from "../../Common/SectionHeader/SectionHeader.jsx";

export default function OurService({ limit, showViewMore = false, variant }) {
  const { t } = useTranslation();
  const { lang } = useLocale();
  const { isVisible, sectionRef } = useIntersectionReveal({
    threshold: 0.12,
    once: true,
  });
  const { settings } = useSettings();
  const { services: homeServices } = useHomeData();

  const { data: servicesData, isLoading: servicesLoading } =
    useGetServicesQuery(lang);
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
  const serviceText =
    settings?.service_text?.[lang] || settings?.service_text || "";

  const textParts = serviceText ? serviceText.split(/\r?\n\r?\n/) : [];
  const subtitle = textParts[0] || t("services.subtitle");
  const description = textParts[1] || t("services.description");

  useEffect(() => {
    if (
      limit ||
      !firstServiceImage ||
      window.matchMedia("(max-width: 768px)").matches
    ) {
      return undefined;
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

  const isHome = variant === "home";
  const showcaseCards = isHome || !limit;

  const header = (
    <SectionHeader
      isHome={isHome}
      showEyebrow={!isHome}
      showAccent={!isHome}
      eyebrow={t("nav.services")}
      title={t("services.title")}
      titleAs={limit ? "h2" : "h1"}
      accentSize="md"
      subtitle={subtitle}
      description={description}
      isVisible={showHeaderImmediately || isVisible}
      visibleClass="fadeIn"
      moduleStyles={styles}
      as="div"
      className={isHome ? styles.homeHeader : ""}
    />
  );

  const grid = (
    <>
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
                homeLayout={showcaseCards}
                color={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                lang={lang}
                t={t}
              />
            ))}
      </div>

      {showViewMore &&
        !showSkeletons &&
        apiServices.length > (limit || 0) && (
          <div
            className={`${styles.viewMoreWrapper} ${isVisible ? styles.fadeIn : ""}`}
          >
            <Link
              to="/services"
              className={styles.viewMoreBtn}
              onClick={() => window.scrollTo(0, 0)}
            >
              <span className={styles.viewMoreInner}>
                <span className={styles.viewMoreLabel}>
                  {t("common.showMore")}
                </span>
                <span className={styles.viewMoreIconWrap} aria-hidden="true">
                  <Icon name="arrowRight" className={styles.viewMoreIcon} />
                </span>
              </span>
            </Link>
          </div>
        )}
    </>
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`${styles.servicesSection} ${!limit ? styles.fullPage : ""} ${isHome ? styles.homeLayout : ""} ${showcaseCards ? styles.showcaseCards : ""}`}
    >
      <div className={styles.backgroundImage}>
        <div className={styles.overlay} />
        <div className={styles.colorGrade} aria-hidden="true" />
        <div className={styles.gridPattern} aria-hidden="true" />
        {!limit && <div className={styles.noiseOverlay} aria-hidden="true" />}
      </div>

      {!limit && <div className={styles.topGlow} aria-hidden="true" />}

      {!limit ? (
        <>
          <div className={styles.pageHero} data-services-hero>
            <div className="container">{header}</div>
          </div>
          <div
            className={`container ${styles.pageBody}`}
            data-services-body
          >
            {grid}
          </div>
        </>
      ) : (
        <div className="container">
          {header}
          {grid}
        </div>
      )}
    </section>
  );
}
