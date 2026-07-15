import styles from "./AboutSectionHeader.module.css";
import HeadingAccent from "../../Common/HeadingAccent/HeadingAccent.jsx";

export default function AboutSectionHeader({
  badge,
  title,
  subtitle,
  isVisible = true,
  align = "center",
  className = "",
}) {
  return (
    <header
      className={`${styles.header} ${styles[align]} ${isVisible ? styles.visible : ""} ${className}`}
    >
      {badge && <span className={styles.badge}>{badge}</span>}
      <h2 className={styles.title}>{title}</h2>
      <HeadingAccent size="md" />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
