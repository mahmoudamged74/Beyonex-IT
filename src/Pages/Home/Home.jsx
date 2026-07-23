import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HeroSection from '../../Components/HomePage/HeroSection/HeroSection'
import OurService from '../../Components/Services/OurService/OurService'
import SectionLoader from '../../Components/Layout/SectionLoader/SectionLoader'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './Home.module.css'

const AboutUS = lazy(() => import('../../Components/HomePage/AboutUS/AboutUS'))
const HomeProcess = lazy(() => import('../../Components/HomePage/HomeProcess/HomeProcess'))
const Advantages = lazy(() => import('../../Components/HomePage/Advantages/Advantages'))
const HomePartnersCta = lazy(() => import('../../Components/HomePage/HomePartnersCta/HomePartnersCta'))

export default function Home() {
  const location = useLocation()
  const { t } = useTranslation()
  usePageTitle(t('nav.home'))

  useEffect(() => {
    if (location.hash !== '#services') return
    const t = setTimeout(() => {
      const el = document.getElementById('services')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
    return () => clearTimeout(t)
  }, [location.hash])

  return (
    <div className={styles.homePage}>
      <div className={styles.pageContent}>
        <HeroSection />

        <div className={styles.homeServices}>
          <OurService limit={3} showViewMore variant="home" />
        </div>

        <Suspense fallback={<SectionLoader />}>
          <div className={styles.homeAbout}>
            <AboutUS variant="home" />
          </div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <div className={styles.homeProcess}>
            <HomeProcess />
          </div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <div className={styles.homeAdvantages}>
            <Advantages variant="home" />
          </div>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <div className={styles.homePartnersCta}>
            <HomePartnersCta />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
