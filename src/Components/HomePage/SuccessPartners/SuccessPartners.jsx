import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SuccessPartners.module.css";
import { useIntersectionReveal } from "../../../hooks/useIntersectionReveal";
import { useLocale } from "../../../hooks/useLocale";
import { useResolvedMediaUrl } from "../../../hooks/useResolvedMediaUrl";
import { useGetPartnersQuery } from "../../../redux/api/partnersApi";
import { STATIC_QUERY_OPTIONS } from "../../../redux/liveQueryOptions";
import { getLocalizedOrRaw } from "../../../utils/i18nHelpers";
import SectionHeader from "../../Common/SectionHeader/SectionHeader.jsx";
import { useInteractiveMarquee } from "./useInteractiveMarquee";

function PartnerLogo({ partner, bare = false }) {
  const imageSrc = useResolvedMediaUrl(partner.image_path);
  const [failed, setFailed] = useState(false);

  if (!imageSrc || failed) return null;

  return (
    <div className={bare ? styles.logoBare : styles.logoCard}>
      <img
        src={imageSrc}
        alt={partner.name}
        className={styles.logoImage}
        loading="eager"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function MarqueeTrack({ items, rowRef, trackRef, rowProps, bareLogos = false }) {
  return (
    <div
      ref={rowRef}
      className={styles.marqueeRow}
      {...rowProps}
      role="region"
      aria-label="Partners carousel"
      tabIndex={0}
    >
      <div ref={trackRef} className={styles.marqueeTrack}>
        <div className={styles.marqueeGroup}>
          {items.map((partner) => (
            <PartnerLogo
              key={`${partner.id}-a`}
              partner={partner}
              bare={bareLogos}
            />
          ))}
        </div>
        <div className={styles.marqueeGroup} aria-hidden="true">
          {items.map((partner) => (
            <PartnerLogo
              key={`${partner.id}-b`}
              partner={partner}
              bare={bareLogos}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SuccessPartners({
  embedded = false,
  isVisible: parentVisible,
  variant,
}) {
  const isHome = variant === "home";
  const { t } = useTranslation();
  const { lang, isRTL } = useLocale();
  const { data, isLoading, isError } = useGetPartnersQuery(
    lang,
    STATIC_QUERY_OPTIONS,
  );

  const partners = useMemo(() => {
    const list = data?.data?.partners;
    if (!Array.isArray(list)) return [];

    return list
      .filter((partner) => partner?.status !== false && partner?.image_path)
      .slice()
      .sort(
        (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || a.id - b.id,
      )
      .map((partner) => ({
        id: partner.id,
        name: getLocalizedOrRaw(partner.title, lang) || t("partners.title"),
        image_path: partner.image_path,
      }));
  }, [data, lang, t]);

  const { isVisible: selfVisible, sectionRef } = useIntersectionReveal({
    threshold: 0.15,
    once: true,
  });
  const { rowRef, trackRef, rowProps } = useInteractiveMarquee({
    isRTL,
    enabled:
      partners.length > 0 && (embedded ? Boolean(parentVisible) : selfVisible),
  });

  const isVisible = embedded ? parentVisible : selfVisible;

  if (isLoading || isError || partners.length === 0) {
    return null;
  }

  const content = (
    <>
      <SectionHeader
        isHome={isHome}
        showEyebrow={!isHome}
        eyebrow={t("partners.label")}
        title={t("partners.title")}
        accentSize="sm"
        subtitle={t("partners.subtitle")}
        isVisible={isVisible}
        moduleStyles={styles}
      />

      <div
        className={`${styles.marqueePanel} ${isVisible ? styles.visible : ""}`}
      >
        <div className={styles.fadeEdgeStart} aria-hidden="true" />
        <div className={styles.fadeEdgeEnd} aria-hidden="true" />

        <MarqueeTrack
          items={partners}
          rowRef={rowRef}
          trackRef={trackRef}
          rowProps={rowProps}
          bareLogos={false}
        />
      </div>
    </>
  );

  if (embedded) {
    return (
      <div
        className={`${styles.partnersEmbedded} ${isHome ? styles.homeLayout : ""}`}
        id="partners"
        aria-label={t("partners.title")}
      >
        {content}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`${styles.partnersSection} ${isHome ? styles.homeLayout : ""}`}
      id="partners"
      aria-label={t("partners.title")}
    >
      <div className="container">{content}</div>
    </section>
  );
}
