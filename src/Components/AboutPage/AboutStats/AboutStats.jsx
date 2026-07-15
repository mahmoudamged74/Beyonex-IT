import { useTranslation } from 'react-i18next'
import styles from './AboutStats.module.css'
import AboutSectionHeader from '../shared/AboutSectionHeader'
import { useAboutData } from '../../../hooks/useAboutData'
import { useCounter } from '../../../hooks/useCounter'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'

import Icon from '../../Common/Icon.jsx'

function StatItem({ icon: iconKey, value, label, delay, isVisible }) {
  const numericValue = String(value).match(/[0-9]+/)?.[0] || 0
  const suffix = String(value).replace(/[0-9]+/g, '')
  const count = useCounter(numericValue, 2000, isVisible)

  return (
    <div
      className={`${styles.statItem} ${isVisible ? styles.visible : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <span className={styles.iconRing} />
        <span className={styles.iconPlate} />
        <Icon name={iconKey} fallback="gem" className={styles.iconGlyph} />
      </div>

      <div className={styles.statContent}>
        <h4 className={styles.label}>{label}</h4>
        <span className={styles.statAccent} aria-hidden="true" />
        <div className={styles.value}>
          {count}
          {suffix}
        </div>
      </div>
    </div>
  )
}

export default function AboutStats() {
  const { t } = useTranslation()
  const { lang, isLoading, aboutData } = useAboutData()
  const achievements = aboutData?.achievements || []
  const { isVisible, sectionRef } = useIntersectionReveal({ deps: [isLoading, lang] })

  const fallbackStats = [
    { icon: 'checkCircle', value: '150+', labelKey: 'projects' },
    { icon: 'users', value: '50+', labelKey: 'clients' },
    { icon: 'trophy', value: '5+', labelKey: 'years' },
    { icon: 'starFill', value: '99%', labelKey: 'satisfaction' },
  ]

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className="container">
        <AboutSectionHeader
          className={styles.statsHeader}
          title={t('aboutPage.stats.title')}
          subtitle={t('aboutPage.stats.subtitle')}
          isVisible={isVisible}
        />

        <div className={styles.statsGrid}>
          {achievements.length > 0 ? (
            achievements.map((stat, index) => (
              <StatItem
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                label={getLocalizedOrRaw(stat.title, lang)}
                delay={index * 0.15}
                isVisible={isVisible}
              />
            ))
          ) : (
            fallbackStats.map((stat, index) => (
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
