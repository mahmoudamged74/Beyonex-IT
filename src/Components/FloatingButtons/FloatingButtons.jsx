import React, { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../utils/iconMap'
import styles from './FloatingButtons.module.css'
import { useGetSettingsQuery } from '../../redux/api/settingsApi'

export default function FloatingButtons() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { data: settingsResponse } = useGetSettingsQuery(i18n.language)
  const settings = settingsResponse?.data

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
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
    
    if (settings?.whatsapp) {
      if (settings.whatsapp.includes('?text=')) return settings.whatsapp
      return `${settings.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
    }

    // Fallback if settings.whatsapp is missing but site_phone exists
    if (settings?.site_phone) {
      return `https://wa.me/${settings.site_phone.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
    }

    return `https://wa.me/+966559544554?text=${encodeURIComponent(whatsappMessage)}`
  }, [settings, isRTL])

  return (
    <>
      {/* WhatsApp Button - Right in English, Left in Arabic */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.whatsappButton} ${isRTL ? styles.whatsappLeft : styles.whatsappRight}`}
        aria-label={isRTL ? 'تواصل معنا على واتساب' : 'Contact us on WhatsApp'}
      >
        {iconMap.whatsapp && React.createElement(iconMap.whatsapp)}
      </a>

      {/* Scroll to Top Button - Left in English, Right in Arabic */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`${styles.scrollTopButton} ${isRTL ? styles.scrollTopRight : styles.scrollTopLeft}`}
          aria-label={isRTL ? 'العودة لأعلى الصفحة' : 'Scroll to top'}
        >
          {iconMap.arrowUp && React.createElement(iconMap.arrowUp)}
        </button>
      )}
    </>
  )
}
