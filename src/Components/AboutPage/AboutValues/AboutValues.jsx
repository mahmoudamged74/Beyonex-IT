import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './AboutValues.module.css'
import { useGetAboutQuery } from '../../../redux/api/aboutApi'

export default function AboutValues() {
  const { t, i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const { data: aboutResponse, isLoading } = useGetAboutQuery(i18n.language)
  const coreValues = aboutResponse?.data?.core_values || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isLoading, i18n.language])

  // Value colors mapping
  const valueColors = ['#E7B742', '#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0']
  const valueIcons = ['lightbulb', 'handshake', 'shieldAlt', 'rocket', 'heart', 'gem']

  return (
    <section ref={sectionRef} className={styles.valuesSection}>
      <div className={styles.backgroundPattern}></div>
      
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>{t('aboutPage.values.title')}</h2>
          <p className={styles.subtitle}>{t('aboutPage.values.subtitle')}</p>
        </div>

        <div className={styles.valuesGrid}>
          {coreValues.length > 0 ? (
            coreValues.map((value, index) => {
              const iconKey = value.icon || valueIcons[index % valueIcons.length]
              const Icon = iconMap[iconKey] || iconMap.gem
              return (
                <div 
                  key={value.id}
                  className={`${styles.valueCard} ${isVisible ? styles.visible : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--value-color': valueColors[index % valueColors.length] 
                  }}
                >
                  <div className={styles.iconContainer}>
                    {Icon && React.createElement(Icon, { className: styles.icon })}
                  </div>
                  <h3 className={styles.valueTitle}>
                    {value.title?.[i18n.language] || value.title}
                  </h3>
                  <p className={styles.valueDesc}>
                    {value.description?.[i18n.language] || value.description}
                  </p>
                  <div className={styles.cardGlow}></div>
                </div>
              )
            })
          ) : (
            // Fallback
            [
              { icon: 'lightbulb', titleKey: 'innovation', descKey: 'innovationDesc', color: '#E7B742' },
              { icon: 'handshake', titleKey: 'trust', descKey: 'trustDesc', color: '#4CAF50' },
              { icon: 'shieldAlt', titleKey: 'quality', descKey: 'qualityDesc', color: '#2196F3' },
              { icon: 'rocket', titleKey: 'growth', descKey: 'growthDesc', color: '#FF9800' },
              { icon: 'heart', titleKey: 'passion', descKey: 'passionDesc', color: '#F44336' },
              { icon: 'gem', titleKey: 'excellence', descKey: 'excellenceDesc', color: '#9C27B0' }
            ].map((value, index) => {
              const Icon = iconMap[value.icon]
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
                    {Icon && React.createElement(Icon, { className: styles.icon })}
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
            })
          )}
        </div>
      </div>
    </section>
  )
}
