import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import FloatingButtons from './FloatingButtons/FloatingButtons'
import SEOManager from './SEOManager/SEOManager'
import LiveDataSync from './LiveDataSync/LiveDataSync'
import PageTransition from './PageTransition/PageTransition'
import SiteBackground from './SiteBackground/SiteBackground'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <>
      <SiteBackground />
      <LiveDataSync />
      <SEOManager />

      <div className={styles.layout}>
        <Navbar />
        <main className={styles.main}>
          <PageTransition />
        </main>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  )
}
