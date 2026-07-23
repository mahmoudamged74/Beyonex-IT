import styles from "./SyncIndicator.module.css";

export default function SyncIndicator({ active }) {
  if (!active) return null;

  return (
    <div
      className={styles.bar}
      role="progressbar"
      aria-hidden="false"
      aria-valuetext="Syncing content"
    />
  );
}
