import { useTranslation } from "react-i18next";
import styles from "./AppLoader.module.css";

/**
 * @param {'full' | 'section' | 'inline'} [variant='full']
 * @param {boolean} [compact] - legacy alias for section
 */
export default function AppLoader({
  variant = "full",
  compact = false,
  label,
}) {
  const { t } = useTranslation();
  const mode = compact ? "section" : variant;
  const text = label || t("common.loading");

  return (
    <div
      className={`${styles.loader} ${styles[mode] || ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={text}
    >
      <div className={styles.mark} aria-hidden="true">
        <span className={styles.ring} />
        <span className={styles.ringDelay} />
        <span className={styles.core}>
          <span className={styles.coreLetter}>B</span>
        </span>
      </div>

      <div className={styles.indicator} aria-hidden="true">
        <div className={styles.track}>
          <span className={styles.bar} />
        </div>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <span className={styles.label}>{text}</span>
    </div>
  );
}
