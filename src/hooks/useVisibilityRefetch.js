import { useEffect, useRef } from 'react';

const DEFAULT_HIDDEN_MS = 30_000;

/**
 * Refetch only after the tab was hidden long enough (e.g. user switched back).
 * Avoids hammering endpoints on every quick focus/blur.
 */
export function useVisibilityRefetch(refetchFns, minHiddenMs = DEFAULT_HIDDEN_MS) {
  const hiddenAtRef = useRef(null);
  const refetchRef = useRef(refetchFns);

  refetchRef.current = refetchFns;

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAtRef.current = Date.now();
        return;
      }

      const hiddenAt = hiddenAtRef.current;
      hiddenAtRef.current = null;

      if (hiddenAt && Date.now() - hiddenAt >= minHiddenMs) {
        refetchRef.current.forEach((refetch) => refetch());
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [minHiddenMs]);
}
