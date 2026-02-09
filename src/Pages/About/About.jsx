import React from 'react'
import AboutHero from '../../Components/AboutPage/AboutHero/AboutHero'
import AboutStory from '../../Components/AboutPage/AboutStory/AboutStory'
import AboutStats from '../../Components/AboutPage/AboutStats/AboutStats'
import AboutValues from '../../Components/AboutPage/AboutValues/AboutValues'
import Team from '../../Components/Team/Team'
import AboutCTA from '../../Components/AboutPage/AboutCTA/AboutCTA'

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutValues />
      <Team />
      <AboutCTA />
    </>
  )
}
