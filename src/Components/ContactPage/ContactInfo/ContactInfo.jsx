import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ContactInfo.module.css'
import { useSettings } from '../../../hooks/useSettings'
import { useLocale } from '../../../hooks/useLocale'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { buildContactSocialLinks } from '../../../utils/socialLinks'
import { normalizeWhatsAppHref } from '../../../utils/whatsapp'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'

export default function ContactInfo({ compact = false }) {
  const { t } = useTranslation()
  const { lang } = useLocale()
  const { settings } = useSettings()
  const { isVisible, sectionRef } = useIntersectionReveal()

  const whatsappHref = useMemo(() => {
    if (settings?.whatsapp) {
      return settings.whatsapp.startsWith('http')
        ? settings.whatsapp
        : normalizeWhatsAppHref(settings.whatsapp)
    }
    if (settings?.site_phone) {
      return normalizeWhatsAppHref(settings.site_phone)
    }
    return null
  }, [settings])

  const contactItems = useMemo(() => {
    const items = []

    if (settings?.site_phone) {
      items.push({
        icon: 'phone',
        title: t('contactPage.info.phone'),
        value: settings.site_phone,
        link: `tel:${settings.site_phone}`,
        isLTR: true,
      })
    }

    if (whatsappHref) {
      const whatsappVal =
        settings.site_phone ||
        (typeof settings.whatsapp === 'string'
          ? settings.whatsapp.split('/').pop()
          : settings.site_phone)
      items.push({
        icon: 'whatsapp',
        title: t('contactPage.info.whatsapp'),
        value: whatsappVal,
        link: whatsappHref,
        isLTR: true,
      })
    }

    if (settings?.site_email) {
      items.push({
        icon: 'envelope',
        title: t('contactPage.info.email'),
        value: settings.site_email,
        link: `mailto:${settings.site_email}`,
        isLTR: true,
      })
    }

    if (settings?.site_address?.[lang]) {
      items.push({
        icon: 'mapMarker',
        title: t('contactPage.info.address'),
        value: settings.site_address[lang],
        link: settings.location_url || '#',
        isLTR: false,
      })
    }

    return items
  }, [settings, t, lang, whatsappHref])

  const socialLinks = useMemo(() => buildContactSocialLinks(settings), [settings])

  const infoContent = (
    <>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('contactPage.info.title')}</h2>
        <p className={styles.sectionSubtitle}>{t('contactPage.info.subtitle')}</p>
      </header>

      {whatsappHref && (
        <a
          href={whatsappHref}
          className={styles.quickWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="whatsapp" className={styles.quickWhatsappIcon} />
          <span>{t('contactPage.info.whatsapp')}</span>
        </a>
      )}

      <div className={styles.contactList}>
        {contactItems.map((item, index) => {
          const content = (
            <>
              <span className={styles.itemIcon} aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <span className={styles.itemContent}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemValue} dir={item.isLTR ? 'ltr' : undefined}>
                  {item.value}
                </span>
              </span>
            </>
          )

          if (item.link) {
            return (
              <a
                key={index}
                href={item.link}
                className={styles.contactItem}
                style={{ '--delay': `${index * 0.06}s` }}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {content}
              </a>
            )
          }

          return (
            <div
              key={index}
              className={styles.contactItem}
              style={{ '--delay': `${index * 0.06}s` }}
            >
              {content}
            </div>
          )
        })}
      </div>

      <div className={styles.workingHours}>
        <span className={styles.hoursIcon} aria-hidden="true">
          <Icon name="clock" />
        </span>
        <div className={styles.hoursContent}>
          <h3 className={styles.hoursTitle}>{t('contactPage.info.workingHours')}</h3>
          <p className={styles.hoursMeta}>
            <span>{t('contactPage.info.weekdays')}</span>
            <span className={styles.hoursTime}>
              {getLocalizedOrRaw(settings?.working_hours, lang) || '8:00 - 16:00'}
            </span>
          </p>
        </div>
      </div>

      {socialLinks.length > 0 && (
        <div className={styles.socialSection}>
          <h3 className={styles.socialTitle}>{t('contactPage.info.followUs')}</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className={styles.socialLink}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )

  return (
    <section
      ref={sectionRef}
      className={`${styles.infoSection} ${compact ? styles.compact : ''}`}
    >
      {compact ? (
        <div className={`${styles.infoWrapper} ${isVisible ? styles.visible : ''}`}>
          {infoContent}
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className={`${styles.infoWrapper} ${isVisible ? styles.visible : ''}`}>
                {infoContent}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
