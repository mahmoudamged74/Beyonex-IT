import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../utils/iconMap'
import styles from './Advantages.module.css'
import { useGetHomeDataQuery } from '../../redux/api/homeApi'

// Style configurations to cycle through
const ADVANTAGE_STYLES = [
  {
    techIcon: 'react',
    color: '#E7B742',
    gradient: 'linear-gradient(135deg, #E7B742 0%, #FFD700 100%)'
  },
  {
    techIcon: 'javascript',
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)'
  },
  {
    techIcon: 'nodejs',
    color: '#2196F3',
    gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)'
  },
  {
    techIcon: 'python',
    color: '#FF9800',
    gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)'
  },
  {
    techIcon: 'docker',
    color: '#9C27B0',
    gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)'
  },
  {
    techIcon: 'git',
    color: '#F44336',
    gradient: 'linear-gradient(135deg, #F44336 0%, #EF5350 100%)'
  }
]

export default function Advantages() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const { data, isLoading } = useGetHomeDataQuery(lang)
  const whyUs = data?.data?.why_us || []

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

  return (
    <section ref={sectionRef} className={styles.advantagesSection}>
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>{t('advantages.title')}</h2>
          <p className={styles.subtitle}>{t('advantages.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {!isLoading && whyUs.map((item, index) => {
            // Cycle through styles if more items are added
            const styleConfig = ADVANTAGE_STYLES[index % ADVANTAGE_STYLES.length]
            
            // Map icon from API or use a default
            const iconKey = item.icon || 'starFill'
            const Icon = iconMap[iconKey] || iconMap.starFill
            const TechIcon = iconMap[styleConfig.techIcon] || iconMap.react

            const title = item.title?.[lang] || item.title?.['ar'] || ''
            const description = item.description?.[lang] || item.description?.['ar'] || ''

            return (
              <div
                key={item.id}
                className={`${styles.card} ${isVisible ? styles.slideUp : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  '--gradient': styleConfig.gradient
                }}
              >
                <div className={styles.iconContainer}>
                  <div 
                    className={styles.iconWrapper}
                    style={{ '--icon-color': styleConfig.color }}
                  >
                    <Icon className={styles.icon} />
                    <div className={styles.iconGlow}></div>
                  </div>
                  <div className={styles.techIconWrapper}>
                    <TechIcon className={styles.techIcon} />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>
                  {title}
                </h3>
                <p className={styles.cardDescription}>
                  {description}
                </p>
                <div className={styles.cardBorder}></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
