import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { iconMap } from "../../utils/iconMap";
import styles from "./ServiceDetails.module.css";
import { useGetServiceDetailsQuery } from "../../redux/api/servicesApi";

export default function ServiceDetails() {
  const { serviceKey } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const { data: serviceResponse, isLoading, isError } = useGetServiceDetailsQuery({ 
    slug: serviceKey, 
    lang: i18n.language 
  });

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
      <div className="container py-5">
        <div className={styles.notFoundCard}>
          <h2 className="mb-2">
            {isRTL ? "الخدمة غير موجودة" : "Service not found"}
          </h2>
          <p className="mb-4">
            {isRTL
              ? "الرابط غير صحيح أو الخدمة اتغيّرت."
              : "This link is invalid or the service has changed."}
          </p>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              {isRTL ? "رجوع" : "Go back"}
            </button>
            <Link className="btn btn-outline-secondary" to="/">
              {isRTL ? "الصفحة الرئيسية" : "Home"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || iconMap.code;
  const accentColor = "#E7B742"; // Default accent

  return (
    <main className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
      <section
        className={styles.hero}
        style={{
          "--accent": accentColor,
        }}
      >
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.breadcrumbs}>
                <Link to="/" className={styles.breadcrumbLink}>
                  {isRTL ? "الرئيسية" : "Home"}
                </Link>
                <span className={styles.breadcrumbSep}>/</span>
                <span className={styles.breadcrumbCurrent}>
                  {service.title?.[i18n.language] || service.title}
                </span>
              </div>

              <h1 className={styles.title}>
                {service.title?.[i18n.language] || service.title}
              </h1>
              
              <div className={styles.overview}>
                {service.short_description?.[i18n.language] || service.short_description}
              </div>

              <div className={styles.richDescription} 
                   dangerouslySetInnerHTML={{ 
                     __html: service.long_description?.[i18n.language] || service.long_description 
                   }} 
              />

              <div className={styles.heroActions}>
                <Link to="/contact" className={styles.primaryButton}>
                  {isRTL ? "اطلب عرض سعر" : "Request a quote"}
                </Link>
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate(-1)}
                >
                  {isRTL ? "رجوع" : "Back"}
                </button>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualCard}>
                <div className={styles.visualBg} />
                <img
                  src={service.image || "/assets/software.webp"}
                  alt={service.title?.[i18n.language] || service.title}
                  className={styles.heroImage}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.visualBadge}>
                  {Icon && <Icon className={styles.visualIcon} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="container py-5">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isRTL ? "التقنيات المستخدمة" : "Technologies We Use"}
            </h2>
          </div>

          <div className={styles.stackGrid}>
            {service.technologies.map((item, index) => (
              <span key={index} className={styles.stackChip}>
                {item}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <section className={styles.altSection}>
          <div className="container py-5">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {isRTL ? "مميزات الخدمة" : "Service Features"}
              </h2>
            </div>

            <div className={styles.cardsGrid}>
              {service.features.map((feature, index) => (
                <div key={index} className={styles.infoCard}>
                  <div className={styles.cardTop}>
                    <Icon className={styles.cardIcon} />
                    <div className={styles.cardLine} />
                  </div>
                  <div className={styles.cardBody}>
                    {typeof feature === 'string' ? feature : (feature?.[i18n.language] || feature)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container py-5">
        <div className={styles.cta}>
          <div>
            <h3 className={styles.ctaTitle}>
              {isRTL
                ? "تبغى نفس الخدمة بمواصفات خاصة؟"
                : "Need this service tailored to you?"}
            </h3>
            <p className={styles.ctaText}>
              {isRTL
                ? "أرسل تفاصيل مشروعك ونرجع لك بخطة تنفيذ واضحة."
                : "Send your project details and we’ll get back with a clear delivery plan."}
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link to="/contact" className="btn btn-dark">
              {isRTL ? "تواصل معنا" : "Contact us"}
            </Link>
            <Link to="/" className="btn btn-outline-secondary">
              {isRTL ? "استكشف خدماتنا" : "Explore services"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
