import React, { useMemo, useState, useSyncExternalStore } from 'react'
import { colors } from '../../../Styles/colors'
import { Link } from 'react-router-dom'
import styles from '../OurService/OurService.module.css'
import { getLocalized } from '../../../utils/i18nHelpers'
import { hexToRgbString } from '../../../utils/colorUtils'
import {
  getServiceIconSource,
  isServiceIconMedia,
  resolveServiceIconName,
} from '../../../utils/resolveServiceIcon'
import { useResolvedMediaUrl } from '../../../hooks/useResolvedMediaUrl'
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
  homeLayout = false,
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

  const serviceIconSource = useMemo(
    () => getServiceIconSource(service),
    [service],
  )
  const iconName = useMemo(
    () => resolveServiceIconName(serviceIconSource),
    [serviceIconSource],
  )
  const iconMediaSrc = useResolvedMediaUrl(
    isServiceIconMedia(serviceIconSource) ? serviceIconSource : null,
  )
  const activeColor = color || service.color || colors.primary
  const rgbValues = useMemo(() => hexToRgbString(activeColor), [activeColor])
  const title = getLocalized(service.title, lang)
  const description = getLocalized(service.short_description, lang)
  const slug = service.slug || service.key
  const serviceNumber = String(index + 1).padStart(2, '0')

  const renderServiceIcon = (iconClassName, imageClassName) =>
    iconMediaSrc ? (
      <img
        src={iconMediaSrc}
        alt=""
        className={imageClassName}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <Icon name={iconName} fallback="codeSlash" className={iconClassName} />
    )

  if (homeLayout) {
    const showHomePhoto = Boolean(service.image)

    return (
      <div className={styles.serviceCardLink}>
        <article
          className={`${styles.serviceCard} ${styles.homeCapitalCard} ${isVisible ? styles.slideUp : ''}`}
          style={{ animationDelay: `${index * 0.12}s` }}
        >
          <div className={styles.homeCapitalMedia}>
            <span className={styles.homeCapitalNumber} aria-hidden="true">
              {serviceNumber}
            </span>

            {!isLoaded && showHomePhoto && (
              <div className={styles.imageSkeleton}>
                <div className={styles.imageSkeletonShimmer} />
              </div>
            )}

            {showHomePhoto ? (
              <img
                src={service.image}
                alt={title}
                loading={prioritizeImage && index === 0 ? 'eager' : 'lazy'}
                fetchPriority={prioritizeImage && index === 0 ? 'high' : 'low'}
                decoding="async"
                className={`${styles.homeCapitalImage} ${isLoaded || index === 0 ? '' : styles.serviceImageHidden}`}
                onLoad={() => setIsLoaded(true)}
              />
            ) : (
              <div className={styles.homeCapitalImageFallback} aria-hidden="true">
                {renderServiceIcon(
                  styles.homeCapitalFallbackIcon,
                  styles.homeCapitalFallbackIconImage,
                )}
              </div>
            )}
          </div>

          <div className={styles.serviceContent}>
            <div className={styles.homeCapitalWatermark} aria-hidden="true">
              {renderServiceIcon(
                styles.homeCapitalWatermarkIcon,
                styles.homeCapitalWatermarkImage,
              )}
            </div>

            <h3 className={styles.serviceTitle}>{title}</h3>
            <p className={styles.serviceDescription}>{description}</p>
          </div>

          <Link
            to={`/services/${slug}`}
            state={{ color: activeColor }}
            className={styles.homeCapitalDetailsBtn}
          >
            <span>{t('services.serviceDetails')}</span>
            <Icon name="arrowRight" className={styles.homeCapitalDetailsArrow} />
          </Link>
        </article>
      </div>
    )
  }

  const serviceMedia = (
    <>
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
          <Icon name={iconName} fallback="codeSlash" className={styles.placeholderIcon} />
        </div>
      )}

      <div className={`${styles.imageOverlay} ${homeLayout ? styles.homeImageOverlay : ''}`} />
      {!homeLayout && <span className={styles.serviceNumber}>{serviceNumber}</span>}

      {!homeLayout && (
        <div className={styles.iconBadge}>
          {iconMediaSrc ? (
            <img
              src={iconMediaSrc}
              alt=""
              className={styles.serviceIconImage}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Icon name={iconName} fallback="codeSlash" className={styles.serviceIcon} />
          )}
        </div>
      )}
      {homeLayout && (
        <div className={styles.homeImageIconWrap}>
          {iconMediaSrc ? (
            <img
              src={iconMediaSrc}
              alt=""
              className={styles.homeServiceIconImage}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Icon name={iconName} fallback="codeSlash" className={styles.homeServiceIcon} />
          )}
        </div>
      )}
    </>
  )

  const serviceBody = (
    <div className={styles.serviceContent}>
      <h3 className={styles.serviceTitle}>{title}</h3>
      <p className={styles.serviceDescription}>{description}</p>

      <span className={`${styles.serviceLink} ${homeLayout ? styles.homeServiceLink : ''}`}>
        <span className={styles.serviceLinkInner}>
          <span className={styles.serviceLinkLabel}>{t('services.learnMore')}</span>
          {homeLayout ? (
            <Icon name="arrowRight" className={styles.homeInlineArrow} />
          ) : (
            <span className={styles.serviceLinkIconWrap}>
              <Icon name="arrowRight" className={styles.arrowIcon} />
            </span>
          )}
        </span>
        {!homeLayout && <span className={styles.serviceLinkShine} aria-hidden="true" />}
      </span>
    </div>
  )

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
        className={`${styles.serviceCard} ${isVisible ? styles.slideUp : ''} ${homeLayout ? styles.homeServiceItem : ''}`}
        style={{ animationDelay: `${index * 0.12}s` }}
      >
        <div className={styles.serviceImageWrapper}>
          {serviceMedia}
          {serviceBody}
        </div>

        <div className={styles.cardGlow} aria-hidden="true" />
      </article>
    </Link>
  )
})

export default ServiceCard
