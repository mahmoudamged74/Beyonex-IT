import styles from "./HeadingAccent.module.css";

export default function HeadingAccent({
  size = "md",
  align = "center",
  className = "",
}) {
  const sizeClass = styles[size] ?? styles.md;
  const alignClass = styles[align] ?? styles.center;

  return (
    <div
      className={`${styles.accent} ${sizeClass} ${alignClass} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className={styles.line} />
      <span className={styles.diamond} />
      <span className={styles.line} />
    </div>
  );
}
