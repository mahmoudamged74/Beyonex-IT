import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Advantages from '../../Components/Advantages/Advantages'
import AboutUS from '../../Components/AboutUS/AboutUS'
import OurService from '../../Components/OurService/OurService'
import { Fade ,Zoom} from "react-awesome-reveal"

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#services') return
    // wait a tick to ensure section is mounted
    const t = setTimeout(() => {
      const el = document.getElementById('services')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
    return () => clearTimeout(t)
  }, [location.hash])

  return <>
    <HeroSection />
    <Fade>
      <OurService />
    </Fade>
    <Fade>
      <AboutUS />
    </Fade>
    <Fade>
    <Advantages />
    </Fade>
  </>

}
