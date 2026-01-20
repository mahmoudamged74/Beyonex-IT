import React from 'react'
import ContactHero from '../../Components/ContactPage/ContactHero/ContactHero'
import ContactForm from '../../Components/ContactPage/ContactForm/ContactForm'
import ContactInfo from '../../Components/ContactPage/ContactInfo/ContactInfo'
import ContactMap from '../../Components/ContactPage/ContactMap/ContactMap'
import styles from './ContactUs.module.css'

export default function ContactUs() {
  return (
    <div className={styles.contactPage}>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <ContactMap />
    </div>
  )
}
