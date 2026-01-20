import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AboutUS.module.css'

export default function AboutUS() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  return (
    <section className={styles.aboutSection}>
      <div className={styles.backgroundImage}>
        <img 
          src="/assets/slide1.jpg" 
          alt="Background" 
          className={`${styles.bgImg} ${isRTL ? styles.flipped : ''}`}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={`container ${styles.content}`}>
        <div className="row align-items-center">
          {/* Logo - Left */}
          <div className={`col-lg-4 col-md-5 ${styles.logoSection}`}>
            <div className={styles.logoWrapper}>
              <img 
                src="/assets/logo.png" 
                alt="BEYONEX IT Logo" 
                className={styles.logo}
              />
            </div>
          </div>

          {/* Content - Right */}
          <div className={`col-lg-8 col-md-7 ${styles.textSection}`}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>{t('about.title')}</h2>
              <h3 className={styles.subtitle}>{t('about.subtitle')}</h3>
              <p className={styles.description}>{t('about.description')}</p>
              
              <div className={styles.missionVision}>
                <div className={styles.missionCard}>
                  <h4 className={styles.cardTitle}>{t('about.mission')}</h4>
                  <p className={styles.cardText}>{t('about.missionText')}</p>
                </div>
                <div className={styles.visionCard}>
                  <h4 className={styles.cardTitle}>{t('about.vision')}</h4>
                  <p className={styles.cardText}>{t('about.visionText')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
