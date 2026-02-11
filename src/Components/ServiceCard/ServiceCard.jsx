import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
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
  t
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const Icon = service.icon

  // Extract RGB values from color for dynamic styling
  const rgbValues = useMemo(() => {
    const rgb = hexToRgb(service.color)
    return `${rgb.r}, ${rgb.g}, ${rgb.b}`
  }, [service.color])

  return (
    <Link
      to={`/services/${service.key}`}
      className={styles.serviceCardLink}
      style={{
        '--service-color': service.color,
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
            src={service.image}
            alt={t(`services.items.${service.key}.title`)}
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
            {t(`services.items.${service.key}.title`)}
          </h3>

          <p className={styles.serviceDescription}>
            {t(`services.items.${service.key}.description`)}
          </p>

          <span className={styles.serviceLink}>
            <span>{t('services.learnMore')}</span>
            <FaArrowRight className={styles.arrowIcon} />
          </span>
        </div>

        <div className={styles.cardBorder}></div>
      </div>
    </Link>
  )
})

export default ServiceCard
