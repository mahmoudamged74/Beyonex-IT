import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './ContactForm.module.css'
import { useSubmitContactFormMutation } from '../../../redux/api/contactApi'

export default function ContactForm() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const formRef = useRef(null)
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    subject: '',
    message: ''
  })
  
  const [submitContact, { isLoading: isSubmitting }] = useSubmitContactFormMutation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    try {
      const response = await submitContact(formData).unwrap()
      setIsSubmitted(true)
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company_name: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      console.error('Submission error:', err)
      setError(err?.data?.message || t('contactPage.form.error'))
    }
  }

  const subjects = [
    { value: '', label: t('contactPage.form.selectSubject') },
    { value: 'general_inquiry', label: t('contactPage.form.subjects.general_inquiry') },
    { value: 'web_development', label: t('contactPage.form.subjects.web_development') },
    { value: 'mobile_applications', label: t('contactPage.form.subjects.mobile_applications') },
    { value: 'erp_systems', label: t('contactPage.form.subjects.erp_systems') },
    { value: 'technical_support', label: t('contactPage.form.subjects.technical_support') },
    { value: 'other', label: t('contactPage.form.subjects.other') }
  ]

  return (
    <section className={styles.formSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className={styles.formWrapper}>
              {/* Section Header */}
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>{t('contactPage.form.badge')}</span>
                <h2 className={styles.sectionTitle}>{t('contactPage.form.title')}</h2>
                <p className={styles.sectionSubtitle}>{t('contactPage.form.subtitle')}</p>
              </div>

              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    {iconMap.checkCircle && React.createElement(iconMap.checkCircle)}
                  </div>
                  <h3>{t('contactPage.form.successTitle')}</h3>
                  <p>{t('contactPage.form.successMessage')}</p>
                  <button 
                    className={styles.newMessageBtn}
                    onClick={() => setIsSubmitted(false)}
                  >
                    {t('contactPage.form.sendAnother')}
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                  {error && (
                    <div className={`alert alert-danger ${styles.errorAlert}`}>
                      {error}
                    </div>
                  )}
                  
                  <div className="row">
                    {/* Name Field */}
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>{iconMap.user && React.createElement(iconMap.user)}</span>
                          <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.namePlaceholder')}
                            required
                            className={styles.formInput}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Email Field */}
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>{iconMap.envelope && React.createElement(iconMap.envelope)}</span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.emailPlaceholder')}
                            required
                            className={styles.formInput}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Phone Field */}
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>{iconMap.phone && React.createElement(iconMap.phone)}</span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.phonePlaceholder')}
                            className={styles.formInput}
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Company Field */}
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>{iconMap.building && React.createElement(iconMap.building)}</span>
                          <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.companyPlaceholder')}
                            className={styles.formInput}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Subject Field */}
                    <div className="col-md-12">
                      <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                          <span className={styles.inputIcon}>{iconMap.commentAlt && React.createElement(iconMap.commentAlt)}</span>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className={styles.formInput}
                          >
                            {subjects.map((subject, index) => (
                              <option key={index} value={subject.value}>
                                {subject.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message Field */}
                    <div className="col-md-12">
                      <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.messagePlaceholder')}
                            required
                            rows={5}
                            className={`${styles.formInput} ${styles.textArea}`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="col-md-12">
                      <button 
                        type="submit" 
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className={styles.spinner}></span>
                            {t('contactPage.form.sending')}
                          </>
                        ) : (
                          <>
                            {iconMap.paperPlane && React.createElement(iconMap.paperPlane, { className: styles.btnIcon })}
                            {t('contactPage.form.submit')}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
