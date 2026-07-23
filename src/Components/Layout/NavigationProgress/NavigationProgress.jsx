import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./NavigationProgress.module.css";

/**
 * Top progress bar shown on every route change.
 */
export default function NavigationProgress() {
  const location = useLocation();
  const [phase, setPhase] = useState("idle");
  const isFirst = useRef(true);
  const timers = useRef([]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return undefined;
    }

    timers.current.forEach(clearTimeout);
    timers.current = [];

    setPhase("start");

    const toLoading = setTimeout(() => setPhase("loading"), 16);
    const toDone = setTimeout(() => setPhase("done"), 420);
    const toIdle = setTimeout(() => setPhase("idle"), 780);

    timers.current = [toLoading, toDone, toIdle];

    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, [location.pathname, location.search]);

  if (phase === "idle") return null;

  return (
    <div
      className={`${styles.progress} ${styles[phase] || ""}`}
      role="progressbar"
      aria-hidden="true"
    >
      <span className={styles.bar} />
      <span className={styles.glow} />
    </div>
  );
}
