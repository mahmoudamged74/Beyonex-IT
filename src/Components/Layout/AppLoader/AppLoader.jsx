import { useTranslation } from "react-i18next";
import styles from "./AppLoader.module.css";

export default function AppLoader({ compact = false }) {
  const { t } = useTranslation();

  return (
    <div
      className={styles.loader}
      style={compact ? { minHeight: "28vh" } : undefined}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{t("common.loading")}</span>
    </div>
  );
}
