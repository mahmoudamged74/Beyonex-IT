import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FaRocket,
  FaCode,
  FaHeadset,
  FaCog,
  FaLock,
  FaShieldAlt
} from 'react-icons/fa'
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiGit
} from 'react-icons/si'
import { 
  BsCodeSlash,
  BsShieldCheck,
  BsHeadset,
  BsRocketTakeoff,
  BsGear,
  BsLockFill
} from 'react-icons/bs'
import styles from './Advantages.module.css'

export default function Advantages() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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

  const advantages = [
    {
      key: 'innovation',
      icon: BsRocketTakeoff,
      techIcon: SiReact,
      color: '#E7B742',
      gradient: 'linear-gradient(135deg, #E7B742 0%, #FFD700 100%)'
    },
    {
      key: 'quality',
      icon: BsCodeSlash,
      techIcon: SiJavascript,
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)'
    },
    {
      key: 'support',
      icon: BsHeadset,
      techIcon: SiNodedotjs,
      color: '#2196F3',
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)'
    },
    {
      key: 'experience',
      icon: BsGear,
      techIcon: SiPython,
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)'
    },
    {
      key: 'customization',
      icon: BsCodeSlash,
      techIcon: SiDocker,
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)'
    },
    {
      key: 'security',
      icon: BsLockFill,
      techIcon: SiGit,
      color: '#F44336',
      gradient: 'linear-gradient(135deg, #F44336 0%, #EF5350 100%)'
    }
  ]

  return (
    <section ref={sectionRef} className={styles.advantagesSection}>
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>{t('advantages.title')}</h2>
          <p className={styles.subtitle}>{t('advantages.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            const TechIcon = advantage.techIcon
            return (
              <div
                key={advantage.key}
                className={`${styles.card} ${isVisible ? styles.slideUp : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  '--gradient': advantage.gradient
                }}
              >
                <div className={styles.iconContainer}>
                  <div 
                    className={styles.iconWrapper}
                    style={{ '--icon-color': advantage.color }}
                  >
                    <Icon className={styles.icon} />
                    <div className={styles.iconGlow}></div>
                  </div>
                  <div className={styles.techIconWrapper}>
                    <TechIcon className={styles.techIcon} />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>
                  {t(`advantages.items.${advantage.key}.title`)}
                </h3>
                <p className={styles.cardDescription}>
                  {t(`advantages.items.${advantage.key}.description`)}
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
