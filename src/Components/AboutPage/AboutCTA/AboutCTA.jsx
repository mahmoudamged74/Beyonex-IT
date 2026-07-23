import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './AboutCTA.module.css'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import Icon from '../../Common/Icon.jsx'

export default function AboutCTA() {
  const { t } = useTranslation()
  const { isVisible, sectionRef } = useIntersectionReveal({ threshold: 0.25 })

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div className="container">
        <div className={`${styles.ctaPanel} ${isVisible ? styles.visible : ''}`}>
          <header className={styles.ctaHeader}>
            <h2 className={styles.title}>{t('aboutPage.cta.title')}</h2>
            <p className={styles.description}>{t('aboutPage.cta.description')}</p>
          </header>

          <div className={styles.ctaActions}>
            <Link to="/start-project" className={styles.primaryBtn}>
              <span>{t('nav.startProject')}</span>
              <Icon name="arrowRight" className={styles.primaryBtnIcon} />
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
