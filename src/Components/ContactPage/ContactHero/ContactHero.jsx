import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ContactHero.module.css'
import { useSettings } from '../../../hooks/useSettings'
import { useLocale } from '../../../hooks/useLocale'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'

export default function ContactHero() {
  const { t } = useTranslation()
  const { lang } = useLocale()
  const { settings } = useSettings()

  const address =
    getLocalizedOrRaw(settings?.site_address, lang) || t('contactPage.hero.location')
  const mapsUrl =
    settings?.location_url || 'https://maps.app.goo.gl/hnZvB37xCRWyb1Bw8?g_st=aw'

  const contactItems = useMemo(() => {
    const items = []

    if (settings?.site_phone) {
      items.push({
        key: 'phone',
        icon: 'phone',
        label: t('contactPage.hero.callUs'),
        value: settings.site_phone,
        href: `tel:${settings.site_phone}`,
        ltr: true,
      })
    }

    if (settings?.site_email) {
      items.push({
        key: 'email',
        icon: 'envelope',
        label: t('contactPage.hero.emailUs'),
        value: settings.site_email,
        href: `mailto:${settings.site_email}`,
      })
    }

    items.push({
      key: 'location',
      icon: 'mapMarker',
      label: t('contactPage.hero.visitUs'),
      value: address,
      href: mapsUrl,
      external: true,
    })

    return items
  }, [settings, t, address, mapsUrl])

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.content}`}>
        <div className={styles.heroContent}>
          <header className={styles.textBlock}>
            <h1 className={styles.title}>{t('contactPage.hero.title')}</h1>
            <p className={styles.subtitle}>{t('contactPage.hero.subtitle')}</p>
          </header>

          <nav className={styles.channels} aria-label={t('nav.contact')}>
            {contactItems.map((item, index) => (
              <a
                key={item.key}
                href={item.href}
                className={styles.channel}
                style={{ '--i': index }}
                dir={item.ltr ? 'ltr' : undefined}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
              >
                <span className={styles.channelIcon} aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <span className={styles.channelValue}>{item.value}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
