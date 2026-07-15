import { useState, useEffect, useRef } from 'react'

export function useIntersectionReveal({
  threshold = 0.1,
  once = false,
  unobserveOnCleanup = false,
  deps = [],
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const depsKey = JSON.stringify(deps)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.disconnect()
          }
        })
      },
      { threshold },
    )

    const currentRef = sectionRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (unobserveOnCleanup && currentRef) {
        observer.unobserve(currentRef)
      } else {
        observer.disconnect()
      }
    }
  }, [threshold, once, unobserveOnCleanup, depsKey])

  return { isVisible, sectionRef }
}
