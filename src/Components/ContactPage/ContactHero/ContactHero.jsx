import { useTranslation } from 'react-i18next'
import styles from './ContactHero.module.css'
import { useSettings } from '../../../hooks/useSettings'
import { useLocale } from '../../../hooks/useLocale'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'
import HeadingAccent from '../../Common/HeadingAccent/HeadingAccent.jsx'

export default function ContactHero() {
  const { t } = useTranslation()
  const { lang } = useLocale()
  const { settings } = useSettings()

  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundImage}>
        <div className={styles.overlay}></div>
      </div>
      <div className={`container ${styles.content}`}>
        <div className="row justify-content-center">
          <div className={`col-lg-12 text-center`}>
            <div className={`${styles.heroContent} ${styles.visible}`}>
              <span className={styles.badge}>{t('contactPage.hero.badge')}</span>
              <h1 className={styles.title}>{t('contactPage.hero.title')}</h1>
              <HeadingAccent size="lg" />
              <p className={styles.subtitle}>{t('contactPage.hero.subtitle')}</p>

              <div className={styles.quickContact}>
                {settings?.site_phone && (
                  <div className={styles.contactCard}>
                    <div className={styles.cardIcon}>
                      <Icon name="phone" />
                    </div>
                    <div className={styles.cardContent}>
                      <span className={styles.cardLabel}>{t('contactPage.hero.callUs')}</span>
                      <a href={`tel:${settings.site_phone}`} className={styles.cardValue} dir="ltr">
                        {settings.site_phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.site_email && (
                  <div className={styles.contactCard}>
                    <div className={styles.cardIcon}>
                      <Icon name="envelope" />
                    </div>
                    <div className={styles.cardContent}>
                      <span className={styles.cardLabel}>{t('contactPage.hero.emailUs')}</span>
                      <a href={`mailto:${settings.site_email}`} className={styles.cardValue}>
                        {settings.site_email}
                      </a>
                    </div>
                  </div>
                )}

                <div className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <Icon name="mapMarker" />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>{t('contactPage.hero.visitUs')}</span>
                    <a
                      href={settings?.location_url || "https://maps.app.goo.gl/hnZvB37xCRWyb1Bw8?g_st=aw"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardValue}
                    >
                      {getLocalizedOrRaw(settings?.site_address, lang) || t('contactPage.hero.location')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
