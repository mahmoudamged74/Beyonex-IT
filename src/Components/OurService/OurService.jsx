import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  FaLaptopCode,
  FaMobileAlt,
  FaDatabase,
  FaServer,
  FaCode,
  FaShieldAlt,
  FaArrowRight
} from 'react-icons/fa'
import styles from './OurService.module.css'

export default function OurService() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [isVisible, setIsVisible] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const services = useMemo(
    () => [
      {
        key: 'web',
        icon: FaLaptopCode,
        color: '#E7B742',
        image: '/assets/web.webp'
      },
      {
        key: 'mobile',
        icon: FaMobileAlt,
        color: '#2196F3',
        image: '/assets/mobile.webp'
      },
      {
        key: 'erp',
        icon: FaDatabase,
        color: '#4CAF50',
        image: '/assets/erp.webp'
      },
      {
        key: 'hardware',
        icon: FaServer,
        color: '#FF9800',
        image: '/assets/hardware.webp'
      },
      {
        key: 'software',
        icon: FaCode,
        color: '#9C27B0',
        image: '/assets/software.webp'
      },
      {
        key: 'cybersecurity',
        icon: FaShieldAlt,
        color: '#F44336',
        image: '/assets/security.webp'
      }
    ],
    []
  )

  return (
    <section id="services" ref={sectionRef} className={styles.servicesSection}>
      <div className={styles.backgroundImage}>
        <img 
          src="/assets/computer.jpg" 
          alt="Programming Background" 
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className={`${styles.bgImg} ${isRTL ? styles.flipped : ''}`}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>{t('services.title')}</h2>
          <p className={styles.subtitle}>{t('services.subtitle')}</p>
          <p className={styles.description}>{t('services.description')}</p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.key}
                to={`/services/${service.key}`}
                className={styles.serviceCardLink}
                style={{ '--service-color': service.color }}
              >
                <div
                  className={`${styles.serviceCard} ${isVisible ? styles.slideUp : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className={styles.serviceImageWrapper}>
                    {!loadedImages[service.key] && (
                      <div className={styles.imageSkeleton}>
                        <div className={styles.imageSkeletonShimmer} />
                      </div>
                    )}
                    <img
                      src={service.image}
                      alt={t(`services.items.${service.key}.title`)}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className={`${styles.serviceImage} ${
                        loadedImages[service.key] ? '' : styles.serviceImageHidden
                      }`}
                      onLoad={() =>
                        setLoadedImages((prev) => ({
                          ...prev,
                          [service.key]: true
                        }))
                      }
                    />
                    <div className={styles.imageOverlay}></div>
                    <div className={styles.iconBadge}>
                      <Icon className={styles.serviceIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.serviceContent}>
                    <div className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}</div>
                    <h3 className={styles.serviceTitle}>
                      {t(`services.items.${service.key}.title`)}
                    </h3>
                    <p className={styles.serviceDescription}>
                      {t(`services.items.${service.key}.description`)}
                    </p>
                    <span className={styles.serviceLink}>
                      <span>{t('services.learnMore')}</span>
                      <FaArrowRight className={styles.arrowIcon} />
                    </span>
                  </div>
                  
                  <div className={styles.cardBorder}></div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
