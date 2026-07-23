import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AboutStats.module.css'
import SectionHeader from '../../Common/SectionHeader/SectionHeader'
import { useAboutData } from '../../../hooks/useAboutData'
import { useCounter } from '../../../hooks/useCounter'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'

import Icon from '../../Common/Icon.jsx'

function isAchievementActive(item) {
  const status = item?.status
  if (status == null) return true
  if (status === false || status === 0 || status === '0') return false
  return Boolean(status)
}

function StatItem({ icon: iconKey, value, label, delay, isVisible }) {
  const numericValue = String(value).match(/[0-9]+/)?.[0] || 0
  const suffix = String(value).replace(/[0-9]+/g, '')
  const count = useCounter(numericValue, 2000, isVisible)

  return (
    <article
      className={`${styles.statItem} ${isVisible ? styles.visible : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <Icon name={iconKey} fallback="gem" className={styles.iconGlyph} />
      </div>

      <div className={styles.statContent}>
        <div className={styles.value}>
          {count}
          {suffix}
        </div>
        <h4 className={styles.label}>{label}</h4>
      </div>
    </article>
  )
}

export default function AboutStats() {
  const { t } = useTranslation()
  const { lang, isLoading, aboutData, showAchievementsSection } = useAboutData()
  const { isVisible, sectionRef } = useIntersectionReveal({
    deps: [isLoading, lang, showAchievementsSection],
  })

  const achievements = useMemo(() => {
    return (aboutData?.achievements || [])
      .filter(isAchievementActive)
      .slice()
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
  }, [aboutData?.achievements])

  if (!showAchievementsSection || achievements.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className="container">
        <SectionHeader
          variant="about"
          className={styles.statsHeader}
          title={t('aboutPage.stats.title')}
          subtitle={t('aboutPage.stats.subtitle')}
          isVisible={isVisible}
        />

        <div className={styles.statsGrid}>
          {achievements.map((stat, index) => (
            <StatItem
              key={stat.id}
              icon={stat.icon}
              value={stat.value}
              label={getLocalizedOrRaw(stat.title, lang)}
              delay={index * 0.15}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
