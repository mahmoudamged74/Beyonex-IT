import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './HeroSection.module.css'
import { useHomeData } from '../../../hooks/useHomeData'
import { useSettings } from '../../../hooks/useSettings'
import { useResolvedMediaUrl } from '../../../hooks/useResolvedMediaUrl'
import { useLocale } from '../../../hooks/useLocale'
import { getLocalized } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'
import HeadingAccent from '../../Common/HeadingAccent/HeadingAccent.jsx'

export default function HeroSection() {
  const { t } = useTranslation()
  const { lang } = useLocale()
  const { hero } = useHomeData()
  const { settings } = useSettings()

  const heroImage = useResolvedMediaUrl(hero?.image)
  const logoSrc = useResolvedMediaUrl(settings?.logo)
  const [bgReady, setBgReady] = useState(!heroImage)

  const { prefix, highlight } = useMemo(() => {
    const subtitle = getLocalized(hero?.subtitle, lang)
    if (subtitle) {
      const words = subtitle.split(' ')
      return {
        prefix: words[0] || '',
        highlight: words.slice(1).join(' '),
      }
    }

    return {
      prefix: t('hero.subtitlePrefix'),
      highlight: t('hero.subtitle'),
    }
  }, [hero?.subtitle, lang, t])

  const title = getLocalized(hero?.title, lang) || t('hero.title')
  const description = getLocalized(hero?.description, lang) || t('hero.description')

  useEffect(() => {
    if (!heroImage) {
      setBgReady(true)
      return undefined
    }

    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'image'
    preloadLink.href = heroImage
    preloadLink.fetchPriority = 'high'
    document.head.appendChild(preloadLink)

    const img = new Image()
    img.onload = () => setBgReady(true)
    img.onerror = () => setBgReady(true)
    img.src = heroImage

    return () => {
      document.head.removeChild(preloadLink)
    }
  }, [heroImage])

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className={styles.heroSection}>
      <div className={styles.bgLayer} aria-hidden="true">
        {heroImage ? (
          <div className={`${styles.bgStage} ${bgReady ? styles.bgStageLoaded : ''}`}>
            <img src={heroImage} alt="" className={styles.bgImgBlur} />
            <img src={heroImage} alt="" className={styles.bgImg} />
          </div>
        ) : (
          <div className={styles.bgFallback} />
        )}
        <div className={styles.imageVignette} />
        <div className={styles.colorGrade} />
        <div className={styles.overlay} />
        <div className={styles.gridOverlay} />
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={`${styles.heroPanel} ${styles.visible}`}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowIcon}>
              <Icon name="rocketTakeoff" />
            </span>
            <span>{t('hero.badge')}</span>
          </div>

          <div className={styles.brandBlock}>
            {logoSrc ? (
              <div className={styles.brandFrame}>
                <img
                  src={logoSrc}
                  alt={title}
                  className={styles.brandLogo}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <h1 className={styles.brandTitle}>{title}</h1>
            )}
          </div>

          <HeadingAccent size="md" className={styles.brandAccent} />

          <h2 className={styles.headline}>
            {prefix && <span className={styles.headlinePrefix}>{prefix}</span>}
            {prefix && highlight && ' '}
            {highlight && <span className={styles.headlineHighlight}>{highlight}</span>}
          </h2>

          <p className={styles.lead}>{description}</p>

          <div className={styles.actions}>
            <Link to="/start-project" className={styles.primaryBtn}>
              <span className={styles.btnContent}>
                <span className={styles.btnLabel}>{t('hero.startProject')}</span>
                <span className={styles.btnIconWrap} aria-hidden="true">
                  <Icon name="arrowRight" className={styles.btnIcon} />
                </span>
              </span>
              <span className={styles.btnShine} aria-hidden="true" />
            </Link>

            <Link to="/contact" className={styles.secondaryBtn}>
              <span className={styles.btnContent}>
                <span className={styles.btnIconWrap} aria-hidden="true">
                  <Icon name="phone" className={styles.btnIcon} />
                </span>
                <span className={styles.btnLabel}>{t('hero.contactUs')}</span>
              </span>
            </Link>
          </div>
        </div>

        <button
          type="button"
          className={styles.scrollHint}
          onClick={scrollToServices}
          aria-label={t('hero.exploreServices')}
        >
          <span className={styles.scrollLine} aria-hidden="true">
            <span className={styles.scrollDot} />
          </span>
          <span className={styles.scrollLabel}>{t('hero.exploreServices')}</span>
        </button>
      </div>

      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  )
}
