import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import styles from './ContactHero.module.css'

export default function ContactHero() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundImage}>
        <img 
          src="/assets/slide1.jpg" 
          alt="Background" 
          className={`${styles.bgImg} ${isRTL ? styles.flipped : ''}`}
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Animated particles */}
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            '--delay': `${Math.random() * 5}s`,
            '--x': `${Math.random() * 100}%`,
            '--duration': `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        <div className="row justify-content-center">
          <div className={`col-lg-10 text-center`}>
            <div className={`${styles.heroContent} ${isVisible ? styles.visible : ''}`}>
              <span className={styles.badge}>{t('contactPage.hero.badge')}</span>
              <h1 className={styles.title}>{t('contactPage.hero.title')}</h1>
              <p className={styles.subtitle}>{t('contactPage.hero.subtitle')}</p>
              
              {/* Quick Contact Cards */}
              <div className={styles.quickContact}>
                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <FaPhone />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>{t('contactPage.hero.callUs')}</span>
                    <a href="tel:+966 11 466 1367" className={styles.cardValue} dir="ltr">+966 11 466 1367</a>
                  </div>
                </div>
                
                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <FaEnvelope />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>{t('contactPage.hero.emailUs')}</span>
                    <a href="mailto:info@beyonexit.com" className={styles.cardValue}>info@beyonexit.com</a>
                  </div>
                </div>
                
                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>{t('contactPage.hero.visitUs')}</span>
                    <a href="https://maps.app.goo.gl/hnZvB37xCRWyb1Bw8?g_st=aw" target="_blank" rel="noopener noreferrer" className={styles.cardValue}>
                      {t('contactPage.hero.location')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
