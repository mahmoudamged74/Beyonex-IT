import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import { Link } from 'react-router-dom'
import styles from './AboutCTA.module.css'
import { useGetSettingsQuery } from '../../../redux/api/settingsApi'

export default function AboutCTA() {
  const { t, i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const { data: settingsResponse } = useGetSettingsQuery(i18n.language)
  const settings = settingsResponse?.data

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div className={styles.backgroundImage}>
        <img 
          src="/assets/computer.jpg" 
          alt="Background" 
          className={styles.bgImg}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className="container">
        <div className={`${styles.ctaContent} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>{t('aboutPage.cta.title')}</h2>
          <p className={styles.description}>{t('aboutPage.cta.description')}</p>
          
          <div className={styles.contactInfo}>
            {settings?.site_phone && (
              <a href={`tel:${settings.site_phone}`} style={{ direction: 'ltr', unicodeBidi: 'embed' }} className={styles.contactItem}>
                {iconMap.phone && React.createElement(iconMap.phone, { className: styles.contactIcon })}
                <span>{settings.site_phone}</span>
              </a>
            )}
            {settings?.site_email && (
              <a href={`mailto:${settings.site_email}`} className={styles.contactItem}>
                {iconMap.envelope && React.createElement(iconMap.envelope, { className: styles.contactIcon })}
                <span>{settings.site_email}</span>
              </a>
            )}
          </div>

          <div className={styles.buttons}>
            <Link 
              to="/contact" 
              className={styles.primaryBtn}
              onClick={() => window.scrollTo(0, 0)}
            >
              <span>{t('aboutPage.cta.contactBtn')}</span>
              {iconMap.arrowRight && React.createElement(iconMap.arrowRight, { className: styles.btnIcon })}
            </Link>
            <Link 
              to="/" 
              className={styles.secondaryBtn}
              onClick={() => window.scrollTo(0, 0)}
            >
              <span>{t('aboutPage.cta.servicesBtn')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className={styles.decorLeft}></div>
      <div className={styles.decorRight}></div>
    </section>
  )
}
