import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FaLightbulb, 
  FaHandshake, 
  FaShieldAlt, 
  FaRocket,
  FaHeart,
  FaGem
} from 'react-icons/fa'
import styles from './AboutValues.module.css'

export default function AboutValues() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const values = [
    {
      icon: FaLightbulb,
      titleKey: 'innovation',
      descKey: 'innovationDesc',
      color: '#E7B742'
    },
    {
      icon: FaHandshake,
      titleKey: 'trust',
      descKey: 'trustDesc',
      color: '#4CAF50'
    },
    {
      icon: FaShieldAlt,
      titleKey: 'quality',
      descKey: 'qualityDesc',
      color: '#2196F3'
    },
    {
      icon: FaRocket,
      titleKey: 'growth',
      descKey: 'growthDesc',
      color: '#FF9800'
    },
    {
      icon: FaHeart,
      titleKey: 'passion',
      descKey: 'passionDesc',
      color: '#F44336'
    },
    {
      icon: FaGem,
      titleKey: 'excellence',
      descKey: 'excellenceDesc',
      color: '#9C27B0'
    }
  ]

  return (
    <section ref={sectionRef} className={styles.valuesSection}>
      <div className={styles.backgroundPattern}></div>
      
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>{t('aboutPage.values.title')}</h2>
          <p className={styles.subtitle}>{t('aboutPage.values.subtitle')}</p>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div 
                key={index}
                className={`${styles.valueCard} ${isVisible ? styles.visible : ''}`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  '--value-color': value.color 
                }}
              >
                <div className={styles.iconContainer}>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={styles.valueTitle}>
                  {t(`aboutPage.values.${value.titleKey}`)}
                </h3>
                <p className={styles.valueDesc}>
                  {t(`aboutPage.values.${value.descKey}`)}
                </p>
                <div className={styles.cardGlow}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
