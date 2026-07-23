import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import FloatingButtons from './FloatingButtons/FloatingButtons'
import SEOManager from './SEOManager/SEOManager'
import LiveDataSync from './LiveDataSync/LiveDataSync'
import PageTransition from './PageTransition/PageTransition'
import SiteBackground from './SiteBackground/SiteBackground'
import { useTheme } from '../../hooks/useTheme'
import styles from './Layout.module.css'

export default function Layout() {
  const { theme } = useTheme()

  return (
    <>
      <SiteBackground />
      <LiveDataSync />
      <SEOManager />

      <div className={styles.layout}>
        <Navbar />
        <main className={styles.main} data-theme={theme}>
          <PageTransition />
        </main>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  )
}
