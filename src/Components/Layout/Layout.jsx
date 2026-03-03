import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import FloatingButtons from '../FloatingButtons/FloatingButtons'
import FoundingDayOverlay from '../FoundingDayOverlay/FoundingDayOverlay'
import SEOManager from '../SEOManager/SEOManager'

export default function Layout() {
  return (
    <>
      <SEOManager />
      <FoundingDayOverlay />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
