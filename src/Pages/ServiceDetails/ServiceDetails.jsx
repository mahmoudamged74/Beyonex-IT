  import React, { useEffect, useMemo } from "react";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import { useTranslation } from "react-i18next";
  import { getServiceByKey } from "../../data/servicesCatalog";
  import styles from "./ServiceDetails.module.css";

  export default function ServiceDetails() {
    const { serviceKey } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    const service = useMemo(() => getServiceByKey(serviceKey), [serviceKey]);
    const copy = useMemo(() => {
      if (!service) return null;
      return isRTL ? service.ar : service.en;
    }, [service, isRTL]);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [serviceKey]);

    if (!service || !copy) {
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

    return (
      <main className={styles.page} dir={isRTL ? "rtl" : "ltr"}>
        <section
          className={styles.hero}
          style={{
            "--accent": service.accent,
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
                  <span className={styles.breadcrumbCurrent}>{copy.title}</span>
                </div>

                <h1 className={styles.title}>{copy.title}</h1>
                <ul>
                  {copy.tagline.map((item) => (
                    <li
                      key={item.id}
                      className={styles.tagline}
                      style={{ margin: "0" }}
                    >
                      {item.title}

                      {item.description.map((desc, index) => (
                        <p
                          key={index}
                          style={{
                            display: "block",
                            margin: "4px 0",
                            width: "100%",
                          }}
                        >
                          {desc}
                        </p>
                      ))}
                    </li>
                  ))}
                </ul>
                <p className={styles.overview}>{copy.overview}</p>

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
                    src={service.heroImage}
                    alt={copy.title}
                    className={styles.heroImage}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.visualBadge}>
                    <service.Icon className={styles.visualIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {isRTL ? "التقنيات اللي بنستخدمها" : "Tech stack"}
            </h2>
            <p className={styles.sectionSubtitle}>
              {isRTL
                ? "اختيارنا للتقنيات بيكون حسب احتياج المشروع والأداء والاستقرار."
                : "We choose tools based on project needs, performance, and long-term stability."}
            </p>
          </div>

          <div className={styles.stackGrid}>
            {service.stacks.map((item) => (
              <span key={item} className={styles.stackChip}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.altSection}>
          <div className="container py-5">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {isRTL ? "وش تستفيد من الخدمة؟" : "What you will get"}
              </h2>
              <p className={styles.sectionSubtitle}>
                {isRTL
                  ? "مخرجات واضحة وتسليم منظم وتجربة استخدام قوية."
                  : "Clear deliverables, structured handover, and a great user experience."}
              </p>
            </div>

            <div className={styles.cardsGrid}>
              {service.deliverables.map((d) => (
                <div key={d.en} className={styles.infoCard}>
                  <div className={styles.cardTop}>
                    <service.Icon className={styles.cardIcon} />
                    <div className={styles.cardLine} />
                  </div>
                  <div className={styles.cardBody}>{isRTL ? d.ar : d.en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
