import { useCallback, useEffect, useRef } from "react";

const AUTO_DURATION_MS = 45000;
const WHEEL_IDLE_MS = 1200;

export function useInteractiveMarquee({ isRTL, enabled = true }) {
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const halfWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, offset: 0 });
  const wheelTimerRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    halfWidthRef.current = track.scrollWidth / 2;
  }, []);

  const wrapOffset = useCallback(() => {
    const half = halfWidthRef.current;
    if (!half) return;

    if (isRTL) {
      while (offsetRef.current >= half) offsetRef.current -= half;
      while (offsetRef.current < 0) offsetRef.current += half;
      return;
    }

    while (offsetRef.current <= -half) offsetRef.current += half;
    while (offsetRef.current > 0) offsetRef.current -= half;
  }, [isRTL]);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  const shiftOffset = useCallback(
    (delta) => {
      offsetRef.current += delta;
      wrapOffset();
      applyTransform();
    },
    [applyTransform, wrapOffset],
  );

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!enabled) return undefined;

    const track = trackRef.current;
    if (!track) return undefined;

    const images = track.querySelectorAll("img");
    let pending = images.length;

    const done = () => {
      measure();
    };

    if (pending === 0) {
      done();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          pending -= 1;
          if (pending === 0) done();
          return;
        }
        const onLoad = () => {
          pending -= 1;
          if (pending === 0) done();
          img.removeEventListener("load", onLoad);
          img.removeEventListener("error", onLoad);
        };
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onLoad);
      });
    }

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(measure)
      : null;
    ro?.observe(track);

    return () => ro?.disconnect();
  }, [enabled, measure]);

  useEffect(() => {
    if (!enabled) return undefined;

    let rafId = 0;
    let lastTime = 0;

    const tick = (time) => {
      if (!lastTime) lastTime = time;

      const half = halfWidthRef.current;
      const canAutoScroll =
        half > 0 &&
        !prefersReducedMotionRef.current &&
        !isDraggingRef.current &&
        !isPausedRef.current;

      if (canAutoScroll) {
        const progress = (time - lastTime) / AUTO_DURATION_MS;
        const step = half * progress * (isRTL ? 1 : -1);
        offsetRef.current += step;
        wrapOffset();
        applyTransform();
      }

      lastTime = time;
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [applyTransform, enabled, isRTL, wrapOffset]);

  useEffect(
    () => () => {
      if (wheelTimerRef.current) {
        window.clearTimeout(wheelTimerRef.current);
      }
    },
    [],
  );

  const pauseAuto = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeAutoLater = useCallback(() => {
    if (wheelTimerRef.current) {
      window.clearTimeout(wheelTimerRef.current);
    }
    wheelTimerRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
    }, WHEEL_IDLE_MS);
  }, []);

  const onPointerDown = useCallback(
    (event) => {
      if (!enabled || event.button !== 0) return;

      isDraggingRef.current = true;
      isPausedRef.current = true;
      dragStartRef.current = {
        x: event.clientX,
        offset: offsetRef.current,
      };

      rowRef.current?.setPointerCapture(event.pointerId);
    },
    [enabled],
  );

  const onPointerMove = useCallback(
    (event) => {
      if (!isDraggingRef.current) return;

      const delta = event.clientX - dragStartRef.current.x;
      offsetRef.current = dragStartRef.current.offset + delta;
      wrapOffset();
      applyTransform();
    },
    [applyTransform, wrapOffset],
  );

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    isPausedRef.current = false;
  }, []);

  const onPointerUp = useCallback(
    (event) => {
      if (!isDraggingRef.current) return;
      rowRef.current?.releasePointerCapture(event.pointerId);
      endDrag();
    },
    [endDrag],
  );

  const onPointerLeave = useCallback(() => {
    endDrag();
  }, [endDrag]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || !enabled) return undefined;

    const handleWheel = (event) => {
      event.preventDefault();
      pauseAuto();

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      shiftOffset(-delta);
      resumeAutoLater();
    };

    row.addEventListener("wheel", handleWheel, { passive: false });
    return () => row.removeEventListener("wheel", handleWheel);
  }, [enabled, pauseAuto, resumeAutoLater, shiftOffset]);

  return {
    rowRef,
    trackRef,
    rowProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onPointerLeave,
    },
  };
}
