import React from 'react'
import { useTranslation } from 'react-i18next'
import ContactHero from '../../Components/ContactPage/ContactHero/ContactHero'
import ContactForm from '../../Components/ContactPage/ContactForm/ContactForm'
import ContactInfo from '../../Components/ContactPage/ContactInfo/ContactInfo'
import ContactMap from '../../Components/ContactPage/ContactMap/ContactMap'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './ContactUs.module.css'

export default function ContactUs() {
  const { t } = useTranslation()
  usePageTitle(t('nav.contact'))

  return (
    <div className={styles.contactPage}>
      <div className={styles.contactHero}>
        <ContactHero />
      </div>

      <section className={styles.contactMain}>
        <div className="container">
          <div className={styles.contactGrid}>
            <ContactForm compact />
            <ContactInfo compact />
          </div>
        </div>
      </section>

      <div className={styles.contactMap}>
        <ContactMap />
      </div>
    </div>
  )
}
