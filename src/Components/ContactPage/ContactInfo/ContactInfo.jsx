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
import HeadingAccent from '../../Common/HeadingAccent/HeadingAccent.jsx'

export default function ContactInfo({ compact = false }) {
  const { t } = useTranslation()
  const { lang } = useLocale()
  const { settings } = useSettings()
  const { isVisible, sectionRef } = useIntersectionReveal()

  const contactItems = useMemo(() => {
    const items = []

    if (settings?.site_phone) {
      items.push({
        icon: "phone",
        title: t('contactPage.info.phone'),
        value: settings.site_phone,
        link: `tel:${settings.site_phone}`,
        isLTR: true
      })
    }

    if (settings?.whatsapp) {
      const whatsappVal = settings.site_phone || settings.whatsapp.split('/').pop()
      items.push({
        icon: "whatsapp",
        title: t('contactPage.info.whatsapp'),
        value: whatsappVal,
        link: settings.whatsapp.startsWith('http') ? settings.whatsapp : normalizeWhatsAppHref(settings.whatsapp),
        isLTR: true
      })
    } else if (settings?.site_phone) {
      items.push({
        icon: "whatsapp",
        title: t('contactPage.info.whatsapp'),
        value: settings.site_phone,
        link: normalizeWhatsAppHref(settings.site_phone),
        isLTR: true
      })
    }

    if (settings?.site_email) {
      items.push({
        icon: "envelope",
        title: t('contactPage.info.email'),
        value: settings.site_email,
        link: `mailto:${settings.site_email}`,
        isLTR: false
      })
    }

    if (settings?.site_address?.[lang]) {
      items.push({
        icon: "mapMarker",
        title: t('contactPage.info.address'),
        value: settings.site_address[lang],
        link: settings.location_url || '#',
        isLTR: false
      })
    }

    return items
  }, [settings, t, lang])

  const socialLinks = useMemo(() => buildContactSocialLinks(settings), [settings])

  const infoContent = (
    <>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>{t('contactPage.info.badge')}</span>
        <h2 className={styles.sectionTitle}>{t('contactPage.info.title')}</h2>
        <HeadingAccent size="md" align="start" />
        <p className={styles.sectionSubtitle}>{t('contactPage.info.subtitle')}</p>
      </div>

      <div className={styles.contactList}>
        {contactItems.map((item, index) => (
          <div key={index} className={styles.contactItem} style={{ '--delay': `${index * 0.1}s` }}>
            <div className={styles.itemIcon}>
              <Icon name={item.icon} />
            </div>
            <div className={styles.itemContent}>
              <span className={styles.itemTitle}>{item.title}</span>
              {item.link ? (
                <a
                  href={item.link}
                  className={styles.itemValue}
                  dir={item.isLTR ? 'ltr' : undefined}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <span className={styles.itemValue}>{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.workingHours}>
        <div className={styles.hoursIcon}>
          <Icon name="clock" />
        </div>
        <div className={styles.hoursContent}>
          <h4 className={styles.hoursTitle}>{t('contactPage.info.workingHours')}</h4>
          <div className={styles.hoursGrid}>
            <div className={styles.hoursItem}>
              <span className={styles.hoursDay}>{t('contactPage.info.weekdays')}</span>
              <span className={styles.hoursTime}>
                {getLocalizedOrRaw(settings?.working_hours, lang) || '8:00 - 16:00'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.socialSection}>
        <h4 className={styles.socialTitle}>{t('contactPage.info.followUs')}</h4>
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
    </>
  )

  return (
    <section ref={sectionRef} className={`${styles.infoSection} ${compact ? styles.compact : ''}`}>
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
