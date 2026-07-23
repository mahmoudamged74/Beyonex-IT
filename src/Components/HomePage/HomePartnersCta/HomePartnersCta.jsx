import { useTranslation } from 'react-i18next'
import SuccessPartners from '../SuccessPartners/SuccessPartners'
import HomeCTA from '../HomeCTA/HomeCTA'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import styles from './HomePartnersCta.module.css'

export default function HomePartnersCta() {
  const { t } = useTranslation()
  const { isVisible, sectionRef } = useIntersectionReveal({ threshold: 0.12, once: true })

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label={`${t('partners.title')} — ${t('homePage.cta.title')}`}
    >
      <div className="container">
        <SuccessPartners embedded variant="home" isVisible={isVisible} />
        <div className={styles.divider} aria-hidden="true" />
        <HomeCTA embedded isVisible={isVisible} />
      </div>
    </section>
  )
}
