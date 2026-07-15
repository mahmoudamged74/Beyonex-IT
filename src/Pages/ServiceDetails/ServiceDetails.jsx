import { useEffect } from 'react'
import { colors } from "../../Styles/colors";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { iconMap } from '../../Components/Common/iconMap';
import styles from "./ServiceDetails.module.css";
import { useGetServiceDetailsQuery } from "../../redux/api/servicesApi";
import { STATIC_QUERY_OPTIONS } from "../../redux/liveQueryOptions";
import { useLocale } from "../../hooks/useLocale";
import { getLocalizedOrRaw } from "../../utils/i18nHelpers";
import Icon from '../../Components/Common/Icon.jsx';
import HeadingAccent from '../../Components/Common/HeadingAccent/HeadingAccent.jsx';

export default function ServiceDetails() {
  const { serviceKey } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, isRTL } = useLocale();

  const { data: serviceResponse, isLoading, isError } = useGetServiceDetailsQuery({
    slug: serviceKey,
    lang,
  }, STATIC_QUERY_OPTIONS);

  const service = serviceResponse?.data;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [serviceKey]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className={`container ${styles.notFoundWrap}`}>
        <div className={styles.notFoundCard}>
          <h2>{isRTL ? "الخدمة غير موجودة" : "Service not found"}</h2>
          <p>
            {isRTL
              ? "الرابط غير صحيح أو الخدمة اتغيّرت."
              : "This link is invalid or the service has changed."}
          </p>
          <div className={styles.notFoundActions}>
            <button type="button" className={styles.primaryButton} onClick={() => navigate(-1)}>
              {isRTL ? "رجوع" : "Go back"}
            </button>
            <Link className={styles.secondaryButton} to="/services">
              {isRTL ? "كل الخدمات" : "All services"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || iconMap.code;
  const accentColor = location.state?.color || service.color || colors.primary;
  const title = getLocalizedOrRaw(service.title, lang);
  const shortDescription = getLocalizedOrRaw(service.short_description, lang);
  const longDescription = getLocalizedOrRaw(service.long_description, lang);
  const features = service.features?.[lang] || (Array.isArray(service.features) ? service.features : []);
  const technologies = service.technologies || [];
  const hasOverview = Boolean(longDescription);
  const hasFeatures = features.length > 0;
  const hasTechnologies = technologies.length > 0;

  return (
    <main
      className={styles.page}
      dir={isRTL ? "rtl" : "ltr"}
      style={{ "--accent": accentColor }}
    >
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadcrumbLink}>
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link to="/services" className={styles.breadcrumbLink}>
              {isRTL ? "الخدمات" : "Services"}
            </Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{title}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.heroBadge}>
                {isRTL ? "تفاصيل الخدمة" : "Service Details"}
              </span>
              <h1 className={styles.title}>{title}</h1>
              <HeadingAccent size="lg" align="start" />
              {shortDescription && (
                <p className={styles.overview}>{shortDescription}</p>
              )}

              {(hasFeatures || hasTechnologies) && (
                <ul className={styles.heroMeta}>
                  {hasFeatures && (
                    <li className={styles.metaItem}>
                      <Icon name="checkCircle" className={styles.metaIcon} />
                      <span>
                        {features.length} {isRTL ? "ميزة" : "benefits"}
                      </span>
                    </li>
                  )}
                  {hasTechnologies && (
                    <li className={styles.metaItem}>
                      <Icon name="code" className={styles.metaIcon} />
                      <span>
                        {technologies.length} {isRTL ? "تقنية" : "technologies"}
                      </span>
                    </li>
                  )}
                </ul>
              )}

              <div className={styles.heroActions}>
                <Link to="/contact" className={styles.primaryButton}>
                  {isRTL ? "اطلب عرض سعر" : "Request a quote"}
                </Link>
                <Link to="/services" className={styles.secondaryButton}>
                  {isRTL ? "كل الخدمات" : "All services"}
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualCard}>
                {service.image && (
                  <img
                    src={service.image}
                    alt={title}
                    className={styles.heroImage}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className={styles.imageOverlay} />
                <div className={styles.visualBadge}>
                  <IconComponent className={styles.visualIcon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <section className={styles.mainLayout}>
        <div className="container">
          <div className={styles.layoutGrid}>

            {/* Main Column */}
            <div className={styles.mainColumn}>
              {hasOverview && (
                <article id="overview" className={styles.contentBlock}>
                  <header className={styles.blockHeader}>
                    <span className={styles.sectionEyebrow}>
                      {isRTL ? "01 — نبذة" : "01 — Overview"}
                    </span>
                    <h2 className={styles.sectionTitle}>
                      {isRTL ? "عن هذه الخدمة" : "About this service"}
                    </h2>
                    <HeadingAccent size="sm" align="start" />
                  </header>
                  <div
                    className={styles.richDescription}
                    dangerouslySetInnerHTML={{ __html: longDescription }}
                  />
                </article>
              )}

              {hasFeatures && (
                <article id="benefits" className={styles.contentBlock}>
                  <header className={styles.blockHeader}>
                    <span className={styles.sectionEyebrow}>
                      {isRTL ? "02 — الفوائد" : "02 — Benefits"}
                    </span>
                    <h2 className={styles.sectionTitle}>
                      {isRTL ? "ما الذي ستحصل عليه؟" : "What you'll get"}
                    </h2>
                    <HeadingAccent size="sm" align="start" />
                    <p className={styles.sectionSubtitle}>
                      {isRTL
                        ? "مخرجات واضحة وتسليم منظم يحقق أهدافك."
                        : "Clear deliverables and structured execution that meets your goals."}
                    </p>
                  </header>

                  <ol className={styles.featuresList}>
                    {features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.featureNumber}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className={styles.featureContent}>
                          <IconComponent className={styles.featureIcon} />
                          <p className={styles.featureText}>
                            {typeof feature === "string" ? feature : feature?.[lang] || feature}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarSticky}>

                {hasTechnologies && (
                  <div className={`${styles.sidebarBlock} ${styles.techBlock}`}>
                    <div className={styles.sidebarBlockHeader}>
                      <span className={styles.sidebarBlockIcon}>
                        <Icon name="code" />
                      </span>
                      <h3 className={styles.sidebarTitle}>
                        {isRTL ? "التقنيات المستخدمة" : "Technologies"}
                      </h3>
                    </div>
                    <ul className={styles.techList}>
                      {technologies.map((item, index) => (
                        <li key={index} className={styles.techItem}>
                          <span className={styles.techBullet} aria-hidden="true" />
                          <span className={styles.techLabel}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </aside>

          </div>
        </div>
      </section>

    </main>
  );
}
