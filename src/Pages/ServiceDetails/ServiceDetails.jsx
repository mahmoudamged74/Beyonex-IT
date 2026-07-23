import { useEffect } from 'react'
import { colors } from "../../Styles/colors";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./ServiceDetails.module.css";
import { useGetServiceDetailsQuery } from "../../redux/api/servicesApi";
import { STATIC_QUERY_OPTIONS } from "../../redux/liveQueryOptions";
import { useLocale } from "../../hooks/useLocale";
import { usePageTitle } from "../../hooks/usePageTitle";
import { getLocalizedOrRaw } from "../../utils/i18nHelpers";
import { getServiceIconSource, resolveServiceIconName } from "../../utils/resolveServiceIcon";
import Icon from '../../Components/Common/Icon.jsx';
import AppLoader from '../../Components/Layout/AppLoader/AppLoader';

export default function ServiceDetails() {
  const { serviceKey } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { lang, isRTL } = useLocale();

  const { data: serviceResponse, isLoading, isError } = useGetServiceDetailsQuery({
    slug: serviceKey,
    lang,
  }, STATIC_QUERY_OPTIONS);

  const service = serviceResponse?.data;
  const pageTitle = service
    ? getLocalizedOrRaw(service.title, lang)
    : t('nav.services');
  usePageTitle(pageTitle);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [serviceKey]);

  if (isLoading) {
    return <AppLoader />;
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

  const serviceIconName = resolveServiceIconName(getServiceIconSource(service));
  const accentColor = location.state?.color || service.color || colors.primary;
  const title = getLocalizedOrRaw(service.title, lang);
  const shortDescription = getLocalizedOrRaw(service.short_description, lang);
  const longDescription = getLocalizedOrRaw(service.long_description, lang);
  const features = service.features?.[lang] || (Array.isArray(service.features) ? service.features : []);
  const technologies = service.technologies || [];
  const hasOverview = Boolean(longDescription);
  const hasFeatures = features.length > 0;
  const hasTechnologies = technologies.length > 0;

  const processSteps = isRTL
    ? [
        { num: "01", title: "تحليل الاحتياج", desc: "فهم الأهداف والمتطلبات بدقة" },
        { num: "02", title: "تصميم الحل", desc: "هيكلة تقنية وتجربة استخدام واضحة" },
        { num: "03", title: "تطوير وتنفيذ", desc: "بناء منظم بجودة قابلة للتوسع" },
        { num: "04", title: "إطلاق ومتابعة", desc: "تسليم آمن ودعم بعد الإطلاق" },
      ]
    : [
        { num: "01", title: "Discovery", desc: "Clarify goals and technical requirements" },
        { num: "02", title: "Solution design", desc: "Architecture and UX mapped to outcomes" },
        { num: "03", title: "Build & deliver", desc: "Structured development with quality gates" },
        { num: "04", title: "Launch & support", desc: "Safe release with post-launch support" },
      ];

  return (
    <main
      className={styles.page}
      dir={isRTL ? "rtl" : "ltr"}
      style={{ "--accent": accentColor }}
    >
      <section className={styles.hero}>
        <div className={styles.heroGridPattern} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
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
              <h1 className={styles.title}>{title}</h1>

              {shortDescription && (
                <p className={styles.overview}>{shortDescription}</p>
              )}

              <div className={styles.heroActions}>
                <Link to="/start-project" className={styles.primaryButton}>
                  <span>{isRTL ? "ابدأ مشروعك" : "Start your project"}</span>
                  <Icon name="arrowRight" className={styles.btnArrow} />
                </Link>
                <Link to="/contact" className={styles.secondaryButton}>
                  {isRTL ? "استشارة تقنية" : "Technical consultation"}
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.productFrame}>
                <div className={styles.frameChrome}>
                  <span className={styles.chromeDots} aria-hidden="true">
                    <i /><i /><i />
                  </span>
                  <span className={styles.chromeTitle}>{title}</span>
                  <span className={styles.chromeBadge}>
                    <Icon name={serviceIconName} fallback="codeSlash" />
                  </span>
                </div>
                <div className={styles.frameViewport}>
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={title}
                      className={styles.heroImage}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.visualFallback} aria-hidden="true">
                      <Icon name={serviceIconName} fallback="codeSlash" />
                    </div>
                  )}
                  <div className={styles.frameScrim} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainLayout}>
        <div className="container">
          <div className={styles.contentPanel}>
            {hasOverview && (
              <article id="overview" className={styles.panelSection}>
                <header className={styles.blockHeader}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIndex}>01</span>
                    {isRTL ? "نطاق الخدمة" : "Service scope"}
                  </h2>
                </header>
                <div
                  className={styles.richDescription}
                  dangerouslySetInnerHTML={{ __html: longDescription }}
                />
              </article>
            )}

            {hasFeatures && (
              <article id="benefits" className={styles.panelSection}>
                <header className={styles.blockHeader}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIndex}>02</span>
                    {isRTL ? "مخرجات التنفيذ" : "Delivery outcomes"}
                  </h2>
                  <p className={styles.sectionSubtitle}>
                    {isRTL
                      ? "قيمة عملية قابلة للقياس داخل مشروعك."
                      : "Practical, measurable value inside your project."}
                  </p>
                </header>

                <ol className={styles.featuresList}>
                  {features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <span className={styles.featureNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={styles.featureText}>
                        {typeof feature === "string" ? feature : feature?.[lang] || feature}
                      </p>
                    </li>
                  ))}
                </ol>
              </article>
            )}

            <article className={styles.panelSection}>
              <header className={styles.blockHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionIndex}>03</span>
                  {isRTL ? "منهجية العمل" : "Delivery methodology"}
                </h2>
                <p className={styles.sectionSubtitle}>
                  {isRTL
                    ? "مسار واضح من التحليل حتى الإطلاق."
                    : "A clear path from discovery to launch."}
                </p>
              </header>

              <ol className={styles.processTrack}>
                {processSteps.map((step, index) => (
                  <li key={step.num} className={styles.processStep}>
                    <span className={styles.processNum}>{step.num}</span>
                    {index < processSteps.length - 1 && (
                      <span className={styles.processConnector} aria-hidden="true" />
                    )}
                    <h3 className={styles.processTitle}>{step.title}</h3>
                    <p className={styles.processDesc}>{step.desc}</p>
                  </li>
                ))}
              </ol>
            </article>

            {hasTechnologies && (
              <article id="stack" className={styles.panelSection}>
                <header className={styles.blockHeader}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIndex}>04</span>
                    {isRTL ? "أدوات وتقنيات التنفيذ" : "Tools & technologies"}
                  </h2>
                  <p className={styles.sectionSubtitle}>
                    {isRTL
                      ? "تقنيات مختارة حسب طبيعة المشروع ومتطلبات التشغيل."
                      : "Selected to match project scope and operational needs."}
                  </p>
                </header>

                <ul className={styles.techGrid}>
                  {technologies.map((item, index) => (
                    <li key={index} className={styles.techChip}>
                      <Icon name="check" className={styles.techCheck} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            <div className={styles.ctaPanel}>
              <div className={styles.ctaCopy}>
                <span className={styles.ctaLabel}>
                  {isRTL ? "الخطوة التالية" : "Next step"}
                </span>
                <h3 className={styles.ctaTitle}>
                  {isRTL ? "ابنِ الحل مع فريق تقني متخصص" : "Build with a specialized tech team"}
                </h3>
                <p className={styles.ctaText}>
                  {isRTL
                    ? "متطلبات واضحة، تصميم دقيق، وتنفيذ بجداول تسليم محددة."
                    : "Clear requirements, precise design, and delivery on a defined timeline."}
                </p>
              </div>
              <div className={styles.ctaActions}>
                <Link to="/start-project" className={styles.ctaPrimary}>
                  <span>{isRTL ? "ابدأ مشروعك" : "Start your project"}</span>
                  <Icon name="arrowRight" className={styles.btnArrow} />
                </Link>
                <Link to="/contact" className={styles.ctaSecondary}>
                  {isRTL ? "تواصل مع فريق المبيعات" : "Talk to sales"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
