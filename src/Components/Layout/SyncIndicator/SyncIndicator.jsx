import styles from "./SyncIndicator.module.css";

export default function SyncIndicator({ active }) {
  return (
    <div
      className={`${styles.bar} ${active ? styles.active : ""}`}
      role="progressbar"
      aria-hidden={!active}
      aria-valuetext={active ? "Syncing content" : undefined}
    />
  );
}
