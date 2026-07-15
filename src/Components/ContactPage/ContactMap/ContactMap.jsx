import { useTranslation } from 'react-i18next'
import styles from './ContactMap.module.css'
import { useSettings } from '../../../hooks/useSettings'
import { useLocale } from '../../../hooks/useLocale'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'
import HeadingAccent from '../../Common/HeadingAccent/HeadingAccent.jsx'

export default function ContactMap() {
  const { t } = useTranslation()
  const { lang } = useLocale()
  const { settings } = useSettings()
  const { isVisible, sectionRef } = useIntersectionReveal()

  const defaultMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463876.9931636556!2d46.5423!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"

  return (
    <section ref={sectionRef} className={styles.mapSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className={`${styles.mapWrapper} ${isVisible ? styles.visible : ''}`}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>{t('contactPage.map.badge')}</span>
                <h2 className={styles.sectionTitle}>{t('contactPage.map.title')}</h2>
                <HeadingAccent size="md" />
                <p className={styles.sectionSubtitle}>{t('contactPage.map.subtitle')}</p>
              </div>

              <div className={styles.mapContainer}>
                <div className={styles.mapFrame}>
                  <iframe
                    src={defaultMapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BEYONEX IT Location"
                  ></iframe>
                </div>

                <div className={styles.locationCard}>
                  <div className={styles.cardIcon}>
                    <Icon name="mapMarker" />
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>{t('contactPage.map.cardTitle')}</h4>
                    <p className={styles.cardAddress}>
                      {getLocalizedOrRaw(settings?.site_address, lang) || t('contactPage.map.address')}
                    </p>
                    <a
                      href={settings?.location_url || "https://maps.app.goo.gl/hnZvB37xCRWyb1Bw8?g_st=aw"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.directionsBtn}
                    >
                      <Icon name="directions" />
                      {t('contactPage.map.getDirections')}
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
