import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ContactForm.module.css'
import { useSubmitContactFormMutation } from '../../../redux/api/contactApi'
import Icon from '../../Common/Icon.jsx'

export default function ContactForm({ compact = false }) {
  const { t } = useTranslation()
  const formRef = useRef(null)

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    subject: '',
    message: '',
  })

  const [submitContact, { isLoading: isSubmitting }] = useSubmitContactFormMutation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [selectOpen, setSelectOpen] = useState(false)
  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formData.subject) {
      setError(t('contactPage.form.selectSubject'))
      return
    }

    try {
      await submitContact(formData).unwrap()
      setIsSubmitted(true)
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company_name: '',
        subject: '',
        message: '',
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
    { value: 'other', label: t('contactPage.form.subjects.other') },
  ]

  const selectedSubject = subjects.find((s) => s.value === formData.subject) || subjects[0]
  const subjectOptions = subjects.filter((s) => s.value)

  const handleSubjectSelect = (value) => {
    setFormData((prev) => ({ ...prev, subject: value }))
    setSelectOpen(false)
  }

  const formBody = (
    <div className={styles.formWrapper}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t('contactPage.form.title')}</h2>
        <p className={styles.sectionSubtitle}>{t('contactPage.form.subtitle')}</p>
      </header>

      {isSubmitted ? (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <Icon name="checkCircle" />
          </div>
          <h3>{t('contactPage.form.successTitle')}</h3>
          <p>{t('contactPage.form.successMessage')}</p>
          <button
            type="button"
            className={styles.newMessageBtn}
            onClick={() => setIsSubmitted(false)}
          >
            {t('contactPage.form.sendAnother')}
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm} noValidate>
          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-full-name">
                {t('contactPage.form.namePlaceholder')}
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <Icon name="user" />
                </span>
                <input
                  id="contact-full-name"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder={t('contactPage.form.namePlaceholder')}
                  required
                  autoComplete="name"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-email">
                {t('contactPage.form.emailPlaceholder')}
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <Icon name="envelope" />
                </span>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contactPage.form.emailPlaceholder')}
                  required
                  autoComplete="email"
                  className={styles.formInput}
                  dir="ltr"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-phone">
                {t('contactPage.form.phonePlaceholder')}
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <Icon name="phone" />
                </span>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contactPage.form.phonePlaceholder')}
                  autoComplete="tel"
                  className={styles.formInput}
                  dir="ltr"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel} htmlFor="contact-company">
                {t('contactPage.form.companyPlaceholder')}
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <Icon name="building" />
                </span>
                <input
                  id="contact-company"
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder={t('contactPage.form.companyPlaceholder')}
                  autoComplete="organization"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.fieldLabel} id="contact-subject-label">
                {t('contactPage.form.selectSubject')}
              </label>
              <div className={`${styles.inputWrapper} ${styles.selectWrapper}`} ref={selectRef}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <Icon name="commentAlt" />
                </span>
                <button
                  type="button"
                  className={`${styles.formInput} ${styles.customSelect} ${selectOpen ? styles.selectOpen : ''}`}
                  onClick={() => setSelectOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={selectOpen}
                  aria-labelledby="contact-subject-label"
                >
                  <span
                    className={`${styles.selectValue} ${!formData.subject ? styles.selectPlaceholder : ''}`}
                  >
                    {selectedSubject.label}
                  </span>
                  <Icon name="chevronDown" className={styles.selectChevron} />
                </button>
                {selectOpen && (
                  <ul className={styles.selectMenu} role="listbox">
                    {subjectOptions.map((subject) => (
                      <li
                        key={subject.value}
                        role="option"
                        aria-selected={formData.subject === subject.value}
                      >
                        <button
                          type="button"
                          className={`${styles.selectOption} ${formData.subject === subject.value ? styles.selectOptionActive : ''}`}
                          onClick={() => handleSubjectSelect(subject.value)}
                        >
                          {subject.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.fieldLabel} htmlFor="contact-message">
                {t('contactPage.form.messagePlaceholder')}
              </label>
              <div className={styles.inputWrapper}>
                <textarea
                  id="contact-message"
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

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className={styles.spinner} />
                {t('contactPage.form.sending')}
              </>
            ) : (
              <>
                <Icon name="paperPlane" className={styles.btnIcon} />
                {t('contactPage.form.submit')}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )

  return (
    <section className={`${styles.formSection} ${compact ? styles.compact : ''}`}>
      {compact ? (
        formBody
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">{formBody}</div>
          </div>
        </div>
      )}
    </section>
  )
}
