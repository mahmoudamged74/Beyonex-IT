import { useTranslation } from 'react-i18next'
import styles from './AboutCTA.module.css'
import { useSettings } from '../../../hooks/useSettings'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import Icon from '../../Common/Icon.jsx'
import HeadingAccent from '../../Common/HeadingAccent/HeadingAccent.jsx'

function ContactCard({ href, icon, value, label, valueDir }) {
  return (
    <a href={href} className={styles.contactCard}>
      <span className={styles.contactIconWrap} aria-hidden="true">
        <span className={styles.contactIconRing} />
        <span className={styles.contactIconPlate} />
        <Icon name={icon} className={styles.contactIconGlyph} />
      </span>

      <span className={styles.contactText}>
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactAccent} aria-hidden="true" />
        <span className={styles.contactValue} dir={valueDir}>
          {value}
        </span>
      </span>
    </a>
  )
}

export default function AboutCTA() {
  const { t } = useTranslation()
  const { settings } = useSettings()
  const { isVisible, sectionRef } = useIntersectionReveal({ threshold: 0.25 })

  const hasPhone = Boolean(settings?.site_phone)
  const hasEmail = Boolean(settings?.site_email)
  const hasContact = hasPhone || hasEmail

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div className={styles.glowTop} aria-hidden="true" />

      <div className="container">
        <div className={`${styles.ctaPanel} ${isVisible ? styles.visible : ''}`}>
          <header className={styles.ctaHeader}>
            <h2 className={styles.title}>{t('aboutPage.cta.title')}</h2>
            <HeadingAccent size="md" />
            <p className={styles.description}>{t('aboutPage.cta.description')}</p>
          </header>

          {hasContact && (
            <>
              <div className={styles.contactDivider} aria-hidden="true" />
              <div
                className={`${styles.contactGrid} ${
                  hasPhone && hasEmail ? styles.contactGridDouble : styles.contactGridSingle
                }`}
              >
                {hasPhone && (
                  <ContactCard
                    href={`tel:${settings.site_phone}`}
                    icon="phone"
                    value={settings.site_phone}
                    label={t('contactPage.hero.callUs')}
                    valueDir="ltr"
                  />
                )}
                {hasEmail && (
                  <ContactCard
                    href={`mailto:${settings.site_email}`}
                    icon="envelope"
                    value={settings.site_email}
                    label={t('contactPage.hero.emailUs')}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
