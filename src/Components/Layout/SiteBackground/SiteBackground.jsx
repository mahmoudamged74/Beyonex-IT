import styles from './SiteBackground.module.css'

export default function SiteBackground() {
  return (
    <div className={styles.siteBackground} aria-hidden="true">
      <div className={styles.overlay} />
      <div className={styles.mesh} />
    </div>
  )
}
