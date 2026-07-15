import React, { useMemo, useState, useSyncExternalStore } from 'react'
import { colors } from '../../../Styles/colors'
import { Link } from 'react-router-dom'
import { iconMap } from '../../Common/iconMap'
import styles from '../OurService/OurService.module.css'
import { getLocalized } from '../../../utils/i18nHelpers'
import { hexToRgbString } from '../../../utils/colorUtils'
import Icon from '../../Common/Icon.jsx'

function subscribeMobileLayout(onStoreChange) {
  const mediaQuery = window.matchMedia('(max-width: 768px)')
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getMobileLayoutSnapshot() {
  return window.matchMedia('(max-width: 768px)').matches
}

function getMobileLayoutServerSnapshot() {
  return false
}

const ServiceCard = React.memo(function ServiceCard({
  service,
  index,
  isVisible,
  prioritizeImage = false,
  color,
  lang,
  t
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const deferPhotos = !prioritizeImage
  const isMobileLayout = useSyncExternalStore(
    subscribeMobileLayout,
    getMobileLayoutSnapshot,
    getMobileLayoutServerSnapshot
  )
  const showPhoto = Boolean(service.image && (!deferPhotos || !isMobileLayout))

  const iconKey = useMemo(() => {
    if (!service.icon) return 'code'
    if (service.icon.includes('/')) {
      const parts = service.icon.split('/')
      return parts[parts.length - 1]
    }
    return service.icon
  }, [service.icon])

  const IconComponent = iconMap[iconKey] || iconMap.code
  const activeColor = color || service.color || colors.primary
  const rgbValues = useMemo(() => hexToRgbString(activeColor), [activeColor])
  const title = getLocalized(service.title, lang)
  const description = getLocalized(service.short_description, lang)
  const slug = service.slug || service.key
  const serviceNumber = String(index + 1).padStart(2, '0')

  return (
    <Link
      to={`/services/${slug}`}
      state={{ color: activeColor }}
      className={styles.serviceCardLink}
      style={{
        '--service-color': activeColor,
        '--service-rgb': rgbValues
      }}
    >
      <article
        className={`${styles.serviceCard} ${isVisible ? styles.slideUp : ''}`}
        style={{ animationDelay: `${index * 0.12}s` }}
      >
        <div className={styles.serviceImageWrapper}>
          {!isLoaded && showPhoto && (
            <div className={styles.imageSkeleton}>
              <div className={styles.imageSkeletonShimmer} />
            </div>
          )}

          {showPhoto ? (
            <img
              src={service.image}
              alt={title}
              loading={prioritizeImage && index === 0 ? "eager" : "lazy"}
              fetchPriority={prioritizeImage && index === 0 ? "high" : "low"}
              decoding="async"
              className={`${styles.serviceImage} ${isLoaded || !prioritizeImage || index === 0 ? "" : styles.serviceImageHidden}`}
              onLoad={() => setIsLoaded(true)}
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true">
              <IconComponent className={styles.placeholderIcon} />
            </div>
          )}

          <div className={styles.imageOverlay} />
          <span className={styles.serviceNumber}>{serviceNumber}</span>

          <div className={styles.iconBadge}>
            <IconComponent className={styles.serviceIcon} />
          </div>

          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>{title}</h3>
            <p className={styles.serviceDescription}>{description}</p>

            <span className={styles.serviceLink}>
              <span className={styles.serviceLinkInner}>
                <span className={styles.serviceLinkLabel}>{t('services.learnMore')}</span>
                <span className={styles.serviceLinkIconWrap}>
                  <Icon name="arrowRight" className={styles.arrowIcon} />
                </span>
              </span>
              <span className={styles.serviceLinkShine} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className={styles.cardGlow} aria-hidden="true" />
      </article>
    </Link>
  )
})

export default ServiceCard
