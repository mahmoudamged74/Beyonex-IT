import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './AboutHero.module.css'
import { useGetAboutQuery } from '../../../redux/api/aboutApi'

export default function AboutHero() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const { data: aboutResponse, isLoading } = useGetAboutQuery(i18n.language)
  const aboutData = aboutResponse?.data
  const aboutPage = aboutData?.about_page
  const heroFeatures = aboutData?.hero_features || []

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Fallback icons for features
  const featureIcons = ['🏆', '🌟', '🚀', '💎', '🔥', '⚡']

  if (isLoading) {
    return <div className={styles.loader}></div> // Or a skeleton
  }

  return (
    <section ref={sectionRef} className={styles.heroSection}>
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
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            '--delay': `${Math.random() * 5}s`,
            '--x': `${Math.random() * 100}%`,
            '--duration': `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        <div className={`${styles.heroContent} ${isVisible ? styles.visible : ''}`}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoGlow}></div>
            <img 
              src={aboutPage?.logo_path || "/assets/3.png"} 
              alt="BEYONEX IT Logo" 
              className={styles.logo}
            />
          </div>

          {/* Text Content */}
          <h1 className={styles.title}>
            {aboutPage?.hero_title?.[i18n.language] || t('aboutPage.hero.title')}
          </h1>
          <p className={styles.subtitle}>
            {aboutPage?.hero_subtitle?.[i18n.language] || t('aboutPage.hero.subtitle')}
          </p>
          <p className={styles.description}>
            {aboutPage?.hero_description?.[i18n.language] || t('aboutPage.hero.description')}
          </p>

          {/* Badges */}
          <div className={styles.badges}>
            {heroFeatures.map((feature, index) => (
              <div key={feature.id} className={styles.badge}>
                <span className={styles.badgeIcon}>{featureIcons[index % featureIcons.length]}</span>
                <span>{feature.title?.[i18n.language] || feature.title}</span>
              </div>
            ))}
            {heroFeatures.length === 0 && (
              <>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>🏆</span>
                  <span>{t('aboutPage.hero.badge1')}</span>
                </div>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>🌟</span>
                  <span>{t('aboutPage.hero.badge2')}</span>
                </div>
                <div className={styles.badge}>
                  <span className={styles.badgeIcon}>🚀</span>
                  <span>{t('aboutPage.hero.badge3')}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <button className={styles.scrollIndicator} onClick={scrollToNext}>
          <span>{t('aboutPage.hero.scrollDown')}</span>
          {iconMap.chevronDown && React.createElement(iconMap.chevronDown, { className: styles.scrollIcon })}
        </button>
      </div>
    </section>
  )
}
