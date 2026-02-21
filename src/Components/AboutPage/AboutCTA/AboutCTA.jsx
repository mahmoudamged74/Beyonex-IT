import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowRight, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './AboutCTA.module.css'

export default function AboutCTA() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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
            <a href="tel:+966 11 466 1367" style={{ direction: 'ltr', unicodeBidi: 'embed' }} className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <span>+966 11 466 1367</span>
            </a>
            <a href="mailto:info@beyonexit.com" className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <span>info@beyonexit.com</span>
            </a>
          </div>

          <div className={styles.buttons}>
            <Link 
              to="/contact" 
              className={styles.primaryBtn}
              onClick={() => window.scrollTo(0, 0)}
            >
              <span>{t('aboutPage.cta.contactBtn')}</span>
              <FaArrowRight className={styles.btnIcon} />
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
