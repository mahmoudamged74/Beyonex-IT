import styles from './AboutSectionSeparator.module.css'

export default function AboutSectionSeparator({ className = '' }) {
  return (
    <div className={`${styles.separator} ${className}`} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.ornament}>
        <span className={styles.ring} />
        <span className={styles.gem} />
      </span>
      <span className={styles.line} />
    </div>
  )
}
