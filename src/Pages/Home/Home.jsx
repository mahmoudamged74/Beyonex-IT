import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../../Components/HomePage/HeroSection/HeroSection'
import OurService from '../../Components/Services/OurService/OurService'
import styles from './Home.module.css'

const AboutUS = lazy(() => import('../../Components/HomePage/AboutUS/AboutUS'))
const Advantages = lazy(() => import('../../Components/HomePage/Advantages/Advantages'))

export default function Home() {
  const location = useLocation()

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
        <OurService limit={3} showViewMore />
        <Suspense fallback={null}>
          <AboutUS />
        </Suspense>
        <Suspense fallback={null}>
          <div className={styles.homeAdvantages}>
            <Advantages />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
