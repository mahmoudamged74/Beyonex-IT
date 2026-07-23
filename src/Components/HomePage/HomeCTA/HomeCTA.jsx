import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './HomeCTA.module.css'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import Icon from '../../Common/Icon.jsx'

export default function HomeCTA({ embedded = false, isVisible: parentVisible }) {
  const { t } = useTranslation()
  const { isVisible: selfVisible, sectionRef } = useIntersectionReveal({
    threshold: 0.2,
    once: true,
  })
  const isVisible = embedded ? parentVisible : selfVisible

  const panel = (
    <div className={`${styles.ctaPanel} ${embedded ? styles.ctaEmbedded : ''} ${isVisible ? styles.visible : ''}`}>
      <h2 className={styles.ctaTitle}>{t('homePage.cta.title')}</h2>
      <p className={styles.ctaDescription}>{t('homePage.cta.description')}</p>

      <div className={styles.ctaActions}>
        <Link to="/start-project" className={styles.primaryBtn}>
          <span className={styles.btnContent}>
            <span>{t('homePage.cta.startProject')}</span>
            <span className={styles.btnIconWrap}>
              <Icon name="arrowRight" className={styles.btnIcon} />
            </span>
          </span>
        </Link>

        <Link to="/contact" className={styles.secondaryBtn}>
          <span className={styles.btnContent}>
            <span className={styles.btnIconWrap}>
              <Icon name="phone" className={styles.btnIcon} />
            </span>
            <span>{t('homePage.cta.contact')}</span>
          </span>
        </Link>
      </div>

      <ul className={styles.trustList} aria-label={t('homePage.cta.trustLabel')}>
        {['trust1', 'trust2', 'trust3'].map((key) => (
          <li key={key} className={styles.trustItem}>
            <Icon name="checkCircle" className={styles.trustIcon} />
            <span>{t(`homePage.cta.${key}`)}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  if (embedded) {
    return (
      <div className={styles.ctaEmbeddedWrap} aria-label={t('homePage.cta.title')}>
        {panel}
      </div>
    )
  }

  return (
    <section ref={sectionRef} className={styles.ctaSection} aria-label={t('homePage.cta.title')}>
      <div className="container">{panel}</div>
    </section>
  )
}
