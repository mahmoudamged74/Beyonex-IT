import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './AboutStats.module.css'
import { useGetAboutQuery } from '../../../redux/api/aboutApi'

// Counter animation hook
function useCounter(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!startCounting) return
    
    const numericEnd = parseInt(String(end).replace(/[^0-9]/g, '')) || 0
    
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * numericEnd))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration, startCounting])
  
  return count
}

function StatItem({ icon: iconKey, value, label, delay, isVisible }) {
  // Extract number and suffix (e.g., "+", "%")
  const numericValue = String(value).match(/[0-9]+/)?.[0] || 0
  const suffix = String(value).replace(/[0-9]+/g, '')
  
  const count = useCounter(numericValue, 2000, isVisible)
  
  const Icon = iconMap[iconKey] || iconMap.gem

  return (
    <div 
      className={`${styles.statItem} ${isVisible ? styles.visible : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.iconWrapper}>
        {Icon && React.createElement(Icon, { className: styles.icon })}
      </div>
      <div className={styles.value}>
        {count}{suffix}
      </div>
      <div className={styles.label}>
        {label}
      </div>
    </div>
  )
}

export default function AboutStats() {
  const { t, i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const { data: aboutResponse, isLoading } = useGetAboutQuery(i18n.language)
  const achievements = aboutResponse?.data?.achievements || []

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

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.backgroundOverlay}></div>
      
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>{t('aboutPage.stats.title')}</h2>
          <p className={styles.subtitle}>{t('aboutPage.stats.subtitle')}</p>
        </div>

        <div className={styles.statsGrid}>
          {achievements.length > 0 ? (
            achievements.map((stat, index) => (
              <StatItem
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                label={stat.title?.[i18n.language] || stat.title}
                delay={index * 0.15}
                isVisible={isVisible}
              />
            ))
          ) : (
            // Fallback
            [
              { icon: 'projectDiagram', value: '150+', labelKey: 'projects' },
              { icon: 'users', value: '50+', labelKey: 'clients' },
              { icon: 'clock', value: '5+', labelKey: 'years' },
              { icon: 'smile', value: '99%', labelKey: 'satisfaction' }
            ].map((stat, index) => (
              <StatItem
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={t(`aboutPage.stats.${stat.labelKey}`)}
                delay={index * 0.15}
                isVisible={isVisible}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
