import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './HeroSection.module.css'
import { useGetHomeDataQuery } from '../../redux/api/homeApi'

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const lang = i18n.language

  const { data } = useGetHomeDataQuery(lang)
  const hero = data?.data?.hero_section

  // Extract prefix (first word) and rest from subtitle
  const subtitle = hero?.subtitle?.[lang] || hero?.subtitle?.['ar'] || ''
  const words = subtitle.split(' ')
  const prefix = words[0] || ''
  const fullText = words.slice(1).join(' ')

  const title = hero?.title?.[lang] || hero?.title?.['ar'] || t('hero.title')
  const description = hero?.description?.[lang] || hero?.description?.['ar'] || t('hero.description')

  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const typingSpeed = 150 
    const deletingSpeed = 100 
    const pauseTime = 2000 

    let timeout

    if (!isDeleting && charIndex < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
    } else if (!isDeleting && charIndex === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, deletingSpeed)
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
      }, 100)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, fullText])

  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      setDisplayedText('')
      setCharIndex(0)
      setIsDeleting(false)
    }, 0)

    return () => clearTimeout(resetTimeout)
  }, [i18n.language])

  useEffect(() => {
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'image'
    preloadLink.href = '/assets/bg.jpg'
    preloadLink.fetchPriority = 'high'
    document.head.appendChild(preloadLink)

    return () => {
      document.head.removeChild(preloadLink)
    }
  }, [])

  return (
    <section className={styles.heroSection}>
      <div className={styles.backgroundImage}>
        <img 
          src="/assets/bg.jpg" 
          alt="Background" 
          className={`${styles.bgImg} ${isRTL ? styles.flipped : ''}`}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <div className="row justify-content-center align-items-center">
          <div className={`col-lg-12 ${styles.textContent}`}>
            <h1 className={styles.title}>
              {title}
            </h1>
            <h2 className={styles.subtitle}>
              {prefix && <span className={styles.prefix}>{prefix}</span>}
              {prefix && ' '}
              <span className={styles.typingText}>
                {displayedText}
                <span className={styles.cursor}>|</span>
              </span>
            </h2>
            <p className={styles.description}>
              {description}
            </p>
            <div className={styles.buttons}>
              <Link to="/#services" className={`btn ${styles.primaryBtn}`}>
                {t('hero.startProject')}
              </Link>
              <Link to="/contact" className={`btn ${styles.secondaryBtn}`}>
                {t('hero.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
