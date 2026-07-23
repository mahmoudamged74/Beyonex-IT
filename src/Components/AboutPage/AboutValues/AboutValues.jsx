import { useTranslation } from 'react-i18next'
import styles from './AboutValues.module.css'
import SectionHeader from '../../Common/SectionHeader/SectionHeader'
import { useAboutData } from '../../../hooks/useAboutData'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'

const valueIcons = ['lightbulb', 'handshake', 'shieldAlt', 'rocket', 'heart', 'gem']

const fallbackValues = [
  { icon: 'lightbulb', titleKey: 'innovation', descKey: 'innovationDesc' },
  { icon: 'handshake', titleKey: 'trust', descKey: 'trustDesc' },
  { icon: 'shieldAlt', titleKey: 'quality', descKey: 'qualityDesc' },
  { icon: 'rocket', titleKey: 'growth', descKey: 'growthDesc' },
  { icon: 'heart', titleKey: 'passion', descKey: 'passionDesc' },
  { icon: 'gem', titleKey: 'excellence', descKey: 'excellenceDesc' },
]

function ValueCard({ icon, title, description, delay, isVisible }) {
  return (
    <article
      className={`${styles.valueCard} ${isVisible ? styles.visible : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={styles.cardHead}>
        <div className={styles.iconWrap} aria-hidden="true">
          <Icon name={icon} fallback="gem" className={styles.iconGlyph} />
        </div>
        <h3 className={styles.valueTitle}>{title}</h3>
      </div>

      <span className={styles.valueAccent} aria-hidden="true" />
      <p className={styles.valueDesc}>{description}</p>
    </article>
  )
}

export default function AboutValues() {
  const { t } = useTranslation()
  const { lang, isLoading, aboutData } = useAboutData()
  const coreValues = aboutData?.core_values || []
  const { isVisible, sectionRef } = useIntersectionReveal({ deps: [isLoading, lang] })

  return (
    <section ref={sectionRef} className={styles.valuesSection}>
      <div className="container">
        <SectionHeader
          variant="about"
          className={styles.valuesHeader}
          title={t('aboutPage.values.title')}
          subtitle={t('aboutPage.values.subtitle')}
          isVisible={isVisible}
        />

        <div className={styles.valuesGrid}>
          {coreValues.length > 0 ? (
            coreValues.map((value, index) => (
              <ValueCard
                key={value.id}
                icon={value.icon || valueIcons[index % valueIcons.length]}
                title={getLocalizedOrRaw(value.title, lang)}
                description={getLocalizedOrRaw(value.description, lang)}
                delay={index * 0.1}
                isVisible={isVisible}
              />
            ))
          ) : (
            fallbackValues.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={t(`aboutPage.values.${value.titleKey}`)}
                description={t(`aboutPage.values.${value.descKey}`)}
                delay={index * 0.1}
                isVisible={isVisible}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
