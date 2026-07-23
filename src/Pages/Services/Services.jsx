import OurService from '../../Components/Services/OurService/OurService'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './Services.module.css'

export default function Services() {
  const { t } = useTranslation()
  usePageTitle(t('nav.services'))
  return (
    <div className={styles.servicesPage}>
      <div className={styles.pageContent}>
        <div className={styles.servicesWrap}>
          <OurService variant="home" />
        </div>
      </div>
    </div>
  )
}
