import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './ContactInfo.module.css'
import { useGetSettingsQuery } from '../../../redux/api/settingsApi'

export default function ContactInfo() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const { data: settingsResponse } = useGetSettingsQuery(i18n.language)
  const settings = settingsResponse?.data

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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
      // Extract number if it's a URL or just use it as is if it's already a link
      const whatsappVal = settings.site_phone || settings.whatsapp.split('/').pop()
      items.push({
        icon: "whatsapp",
        title: t('contactPage.info.whatsapp'),
        value: whatsappVal,
        link: settings.whatsapp.startsWith('http') ? settings.whatsapp : `https://wa.me/${settings.whatsapp.replace(/\+/g, '')}`,
        isLTR: true
      })
    } else if (settings?.site_phone) {
      items.push({
        icon: "whatsapp",
        title: t('contactPage.info.whatsapp'),
        value: settings.site_phone,
        link: `https://wa.me/${settings.site_phone.replace(/\+/g, '')}`,
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

    if (settings?.site_address?.[i18n.language]) {
      items.push({
        icon: "mapMarker",
        title: t('contactPage.info.address'),
        value: settings.site_address[i18n.language],
        link: settings.location_url || '#',
        isLTR: false
      })
    }

    return items
  }, [settings, t, i18n.language])

  const socialLinks = useMemo(() => {
    if (!settings) return []
    
    const platforms = [
      { key: "facebook", icon: "facebook", label: "Facebook" },
      { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
      { key: "snapchat", icon: "snapchat", label: "SnapChat" },
      { key: "instagram", icon: "instagram", label: "Instagram" },
      { key: "twitter", icon: "twitter", label: "X" },
      { key: "telegram", icon: "paperPlane", label: "Telegram" },
      { key: "tiktok", icon: "tiktok", label: "TikTok" }
    ]

    return platforms
      .filter(p => settings[p.key])
      .map(p => ({
        ...p,
        link: settings[p.key]
      }))
  }, [settings])

  return (
    <section ref={sectionRef} className={styles.infoSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className={`${styles.infoWrapper} ${isVisible ? styles.visible : ''}`}>
              {/* Section Header */}
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>{t('contactPage.info.badge')}</span>
                <h2 className={styles.sectionTitle}>{t('contactPage.info.title')}</h2>
                <p className={styles.sectionSubtitle}>{t('contactPage.info.subtitle')}</p>
              </div>

              {/* Contact Cards */}
              <div className={`row ${styles.contactGrid}`}>
                {contactItems.map((item, index) => (
                   <div className="col-md-6" key={index}>
                    <div className={styles.contactItem} style={{ '--delay': `${index * 0.1}s` }}>
                      <div className={styles.itemIcon}>
                        {iconMap[item.icon] && React.createElement(iconMap[item.icon])}
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
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className={styles.workingHours}>
                <div className={styles.hoursIcon}>
                  {iconMap.clock && React.createElement(iconMap.clock)}
                </div>
                <div className={styles.hoursContent}>
                  <h4 className={styles.hoursTitle}>{t('contactPage.info.workingHours')}</h4>
                  <div className={styles.hoursGrid}>
                    <div className={styles.hoursItem}>
                      <span className={styles.hoursDay}>{t('contactPage.info.weekdays')}</span>
                      <span className={styles.hoursTime}>
                        {settings?.working_hours?.[i18n.language] || '8:00 - 16:00'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
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
                      {iconMap[social.icon] && React.createElement(iconMap[social.icon])}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
