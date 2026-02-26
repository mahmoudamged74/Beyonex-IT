import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { iconMap } from '../../utils/iconMap'
import styles from '../OurService/OurService.module.css'

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 231, g: 183, b: 66 } // Default gold color
}

const ServiceCard = React.memo(function ServiceCard({
  service,
  index,
  isVisible,
  color,
  lang,
  t
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Extract icon name from URL or use as is
  const iconKey = useMemo(() => {
    if (!service.icon) return 'code'
    // If it's a URL, get the last segment
    if (service.icon.includes('/')) {
      const parts = service.icon.split('/')
      return parts[parts.length - 1]
    }
    return service.icon
  }, [service.icon])

  // Use iconMap to get the icon component or default to a safe icon
  const Icon = iconMap[iconKey] || iconMap.code

  // Use the passed color or fallback to service.color or default
  const activeColor = color || service.color || '#E7B742'

  // Extract RGB values from color for dynamic styling
  const rgbValues = useMemo(() => {
    const rgb = hexToRgb(activeColor)
    return `${rgb.r}, ${rgb.g}, ${rgb.b}`
  }, [activeColor])

  // Get localized content
  const title = service.title?.[lang] || service.title?.['ar'] || ''
  const description = service.short_description?.[lang] || service.short_description?.['ar'] || ''
  const slug = service.slug || service.key

  return (
    <Link
      to={`/services/${slug}`}
      className={styles.serviceCardLink}
      style={{
        '--service-color': activeColor,
        '--service-rgb': rgbValues
      }}
    >
      <div
        className={`${styles.serviceCard} ${isVisible ? styles.slideUp : ''}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className={styles.serviceImageWrapper}>
          {!isLoaded && (
            <div className={styles.imageSkeleton}>
              <div className={styles.imageSkeletonShimmer} />
            </div>
          )}

          <img
            src={service.image || '/assets/software.webp'}
            alt={title}
            loading="lazy"
            decoding="async"
            className={`${styles.serviceImage} ${
              isLoaded ? '' : styles.serviceImageHidden
            }`}
            onLoad={() => setIsLoaded(true)}
          />

          <div className={styles.imageOverlay}></div>
          <div className={styles.iconBadge}>
            <Icon className={styles.serviceIcon} />
          </div>
        </div>

        <div className={styles.serviceContent}>
          <div className={styles.serviceNumber}>
            {String(index + 1).padStart(2, '0')}
          </div>

          <h3 className={styles.serviceTitle}>
            {title}
          </h3>

          <p className={styles.serviceDescription}>
             {description}
          </p>

          <span className={styles.serviceLink}>
            <span>{t('services.learnMore')}</span>
            {iconMap.arrowRight && React.createElement(iconMap.arrowRight, { className: styles.arrowIcon })}
          </span>
        </div>

        <div className={styles.cardBorder}></div>
      </div>
    </Link>
  )
})

export default ServiceCard
