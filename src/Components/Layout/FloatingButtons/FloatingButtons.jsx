import { useState, useEffect, useMemo } from 'react'
import styles from './FloatingButtons.module.css'
import { useLocale } from '../../../hooks/useLocale'
import { useSettings } from '../../../hooks/useSettings'
import { buildWhatsAppUrl } from '../../../utils/whatsapp'
import Icon from '../../Common/Icon.jsx'

export default function FloatingButtons() {
  const { isRTL } = useLocale()
  const { settings } = useSettings()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const whatsappUrl = useMemo(() => {
    const whatsappMessage = isRTL
      ? 'مرحباً، أريد الاستفسار عن خدماتكم'
      : 'Hello, I would like to inquire about your services'

    return buildWhatsAppUrl({
      whatsapp: settings?.whatsapp,
      sitePhone: settings?.site_phone,
      message: whatsappMessage,
    })
  }, [settings, isRTL])

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.whatsappButton} ${isRTL ? styles.whatsappLeft : styles.whatsappRight}`}
        aria-label={isRTL ? 'تواصل معنا على واتساب' : 'Contact us on WhatsApp'}
      >
        <span className={`${styles.whatsappPulse} ${styles.whatsappPulseOne}`} aria-hidden="true" />
        <span className={`${styles.whatsappPulse} ${styles.whatsappPulseTwo}`} aria-hidden="true" />
        <span className={styles.whatsappIcon}>
          <Icon name="whatsapp" />
        </span>
      </a>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`${styles.scrollTopButton} ${isRTL ? styles.scrollTopRight : styles.scrollTopLeft}`}
          aria-label={isRTL ? 'العودة لأعلى الصفحة' : 'Scroll to top'}
        >
          <Icon name="arrowUp" />
        </button>
      )}
    </>
  )
}
