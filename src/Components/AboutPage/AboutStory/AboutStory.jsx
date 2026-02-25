import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './AboutStory.module.css'

export default function AboutStory() {
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

  const milestones = [
    {
      icon: 'rocket',
      year: '2020',
      titleKey: 'milestone1Title',
      descKey: 'milestone1Desc'
    },
    {
      icon: 'users',
      year: '2021',
      titleKey: 'milestone2Title',
      descKey: 'milestone2Desc'
    },
    {
      icon: 'globe',
      year: '2023',
      titleKey: 'milestone3Title',
      descKey: 'milestone3Desc'
    },
    {
      icon: 'trophy',
      year: '2025',
      titleKey: 'milestone4Title',
      descKey: 'milestone4Desc'
    }
  ]

  return (
    <section ref={sectionRef} className={styles.storySection}>
      <div className={styles.backgroundPattern}></div>
      
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>{t('aboutPage.story.title')}</h2>
          <p className={styles.subtitle}>{t('aboutPage.story.subtitle')}</p>
        </div>

        <div className={styles.storyContent}>
          {/* Mission & Vision Cards */}
          <div className={`${styles.cardsRow} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <span>🎯</span>
              </div>
              <h3 className={styles.cardTitle}>{t('about.mission')}</h3>
              <p className={styles.cardText}>{t('about.missionText')}</p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <span>👁️</span>
              </div>
              <h3 className={styles.cardTitle}>{t('about.vision')}</h3>
              <p className={styles.cardText}>{t('about.visionText')}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className={styles.timeline}>
            <div className={styles.timelineLine}></div>
            
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              return (
                <div 
                  key={index}
                  className={`${styles.timelineItem} ${isVisible ? styles.visible : ''}`}
                  style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                >
                  <div className={styles.timelineYear}>{milestone.year}</div>
                  <div className={styles.timelineNode}>
                    {iconMap[milestone.icon] && React.createElement(iconMap[milestone.icon], { className: styles.nodeIcon })}
                  </div>
                  <div className={styles.timelineContent}>
                    <h4 className={styles.timelineTitle}>
                      {t(`aboutPage.story.${milestone.titleKey}`)}
                    </h4>
                    <p className={styles.timelineDesc}>
                      {t(`aboutPage.story.${milestone.descKey}`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
