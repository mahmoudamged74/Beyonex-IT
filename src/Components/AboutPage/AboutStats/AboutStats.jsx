import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './AboutStats.module.css'

// Counter animation hook
function useCounter(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!startCounting) return
    
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration, startCounting])
  
  return count
}

function StatItem({ icon: Icon, value, suffix, labelKey, delay, isVisible }) {
  const { t } = useTranslation()
  const count = useCounter(value, 2000, isVisible)
  
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
        {t(`aboutPage.stats.${labelKey}`)}
      </div>
    </div>
  )
}

export default function AboutStats() {
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

  const stats = [
    { icon: 'projectDiagram', value: 150, suffix: '+', labelKey: 'projects' },
    { icon: 'users', value: 50, suffix: '+', labelKey: 'clients' },
    { icon: 'clock', value: 5, suffix: '+', labelKey: 'years' },
    { icon: 'smile', value: 99, suffix: '%', labelKey: 'satisfaction' }
  ]

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.backgroundOverlay}></div>
      
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>{t('aboutPage.stats.title')}</h2>
          <p className={styles.subtitle}>{t('aboutPage.stats.subtitle')}</p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={iconMap[stat.icon]}
              value={stat.value}
              suffix={stat.suffix}
              labelKey={stat.labelKey}
              delay={index * 0.15}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
