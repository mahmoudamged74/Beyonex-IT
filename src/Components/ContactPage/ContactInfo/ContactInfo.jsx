import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaWhatsapp,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaSnapchat
} from 'react-icons/fa'
import styles from './ContactInfo.module.css'

export default function ContactInfo() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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

  const contactItems = [
    {
      icon: <FaPhone />,
      title: t('contactPage.info.phone'),
      value: '+966 559 544 554',
      link: 'tel:+966559544554',
      isLTR: true
    },
    {
      icon: <FaWhatsapp />,
      title: t('contactPage.info.whatsapp'),
      value: '+966 559 544 554',
      link: 'https://wa.me/966559544554',
      isLTR: true
    },
    {
      icon: <FaEnvelope />,
      title: t('contactPage.info.email'),
      value: 'info@beyonexit.com',
      link: 'mailto:info@beyonexit.com',
      isLTR: false
    },
    {
      icon: <FaMapMarkerAlt />,
      title: t('contactPage.info.address'),
      value: t('contactPage.info.addressValue'),
      link: 'https://maps.app.goo.gl/hnZvB37xCRWyb1Bw8?g_st=aw',
      isLTR: false
    }
  ]

  const socialLinks = [
    { icon: <FaFacebookF />, link: '#', label: 'Facebook' },
    { icon: <FaLinkedinIn />, link: 'https://www.linkedin.com/in/beyonex-it-53a5713a9/', label: 'LinkedIn' },
    { icon: <FaSnapchat />, link: 'https://www.snapchat.com/add/beyonex.it', label: 'SnapChat' },
    { icon: <FaInstagram />, link: 'https://www.instagram.com/beyonex.it/?hl=ar', label: 'Instagram' },
    { icon: <FaTwitter />, link: '#', label: 'Twitter' }
  ]

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
                        {item.icon}
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
                  <FaClock />
                </div>
                <div className={styles.hoursContent}>
                  <h4 className={styles.hoursTitle}>{t('contactPage.info.workingHours')}</h4>
                  <div className={styles.hoursGrid}>
                    <div className={styles.hoursItem}>
                      <span className={styles.hoursDay}>{t('contactPage.info.weekdays')}</span>
                      <span className={styles.hoursTime}>8:00 - 16:00</span>
                    </div>
                    {/* <div className={styles.hoursItem}>
                      <span className={styles.hoursDay}>{t('contactPage.info.weekend')}</span>
                      <span className={styles.hoursClosed}>{t('contactPage.info.closed')}</span>
                    </div> */}
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
                      {social.icon}
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
