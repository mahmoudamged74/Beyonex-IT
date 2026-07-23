import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ContactMap.module.css'
import { useSettings } from '../../../hooks/useSettings'
import { useLocale } from '../../../hooks/useLocale'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'

const DEFAULT_COORDS = { lat: 24.7136, lng: 46.6753 }

const DEFAULT_MAPS_URL =
  'https://maps.app.goo.gl/hnZvB37xCRWyb1Bw8?g_st=aw'

function extractCoords(url) {
  if (!url || typeof url !== 'string') return null

  try {
    const parsed = new URL(url.trim())
    const q = parsed.searchParams.get('q') || ''
    const ll = parsed.searchParams.get('ll') || ''
    const center = parsed.searchParams.get('center') || ''

    const fromPair = (value) => {
      const match = String(value).match(/(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/)
      if (!match) return null
      return { lat: Number(match[1]), lng: Number(match[2]) }
    }

    return fromPair(ll) || fromPair(center) || fromPair(q)
  } catch {
    return null
  }
}

function toEmbedUrl(url, lang = 'ar') {
  const hl = lang?.startsWith('en') ? 'en' : 'ar'
  const coords = extractCoords(url) || DEFAULT_COORDS
  // Clean light street map (professional contact-page look)
  return `https://maps.google.com/maps?ll=${coords.lat},${coords.lng}&z=15&hl=${hl}&t=m&output=embed`
}

export default function ContactMap() {
  const { t } = useTranslation()
  const { lang } = useLocale()
  const { settings } = useSettings()
  const { isVisible, sectionRef } = useIntersectionReveal()

  const mapsUrl = settings?.location_url || DEFAULT_MAPS_URL
  const mapEmbedSrc = useMemo(
    () => toEmbedUrl(settings?.map_embed_url || settings?.location_url, lang),
    [settings?.map_embed_url, settings?.location_url, lang],
  )
  const address =
    getLocalizedOrRaw(settings?.site_address, lang) || t('contactPage.map.address')
  const companyName =
    getLocalizedOrRaw(settings?.site_name, lang) || t('footer.companyName')

  return (
    <section ref={sectionRef} className={styles.mapSection}>
      <div className="container">
        <div className={`${styles.mapWrapper} ${isVisible ? styles.visible : ''}`}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('contactPage.map.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('contactPage.map.subtitle')}</p>
          </header>

          <div className={styles.mapShell}>
            <div className={styles.mapFrame}>
              <iframe
                src={mapEmbedSrc}
                title={`${companyName} Location`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className={styles.mapVeil} aria-hidden="true" />

              <div className={styles.mapMarker} aria-hidden="true">
                <div className={styles.markerLabel}>
                  <span className={styles.markerName}>{companyName}</span>
                </div>
                <div className={styles.markerPin}>
                  <span className={styles.markerPinCore} />
                </div>
                <span className={styles.markerPulse} />
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapHitArea}
                aria-label={t('contactPage.map.getDirections')}
              />
            </div>

            <aside className={styles.locationPanel}>
              <div className={styles.panelAccent} aria-hidden="true" />
              <div className={styles.panelGlow} aria-hidden="true" />

              <div className={styles.panelBody}>
                <span className={styles.panelIcon} aria-hidden="true">
                  <Icon name="mapMarker" />
                </span>

                <div className={styles.panelCopy}>
                  <h3 className={styles.panelTitle}>{t('contactPage.map.cardTitle')}</h3>
                  <p className={styles.panelAddress}>{address}</p>
                </div>

                <div className={styles.panelMeta}>
                  {settings?.site_phone && (
                    <a href={`tel:${settings.site_phone}`} className={styles.metaLink}>
                      <span className={`${styles.metaIcon} ${styles.metaIconPhone}`}>
                        <Icon name="phone" />
                      </span>
                      <span className={styles.metaText} dir="ltr">
                        {settings.site_phone}
                      </span>
                    </a>
                  )}
                  {settings?.site_email && (
                    <a href={`mailto:${settings.site_email}`} className={styles.metaLink}>
                      <span className={styles.metaIcon}>
                        <Icon name="envelope" />
                      </span>
                      <span className={styles.metaText} dir="ltr">
                        {settings.site_email}
                      </span>
                    </a>
                  )}
                </div>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsBtn}
                >
                  <Icon name="directions" className={styles.directionsIcon} />
                  <span>{t('contactPage.map.getDirections')}</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
