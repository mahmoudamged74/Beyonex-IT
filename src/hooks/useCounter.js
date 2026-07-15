import { useState, useEffect } from 'react'

export function useCounter(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return

    const numericEnd = parseInt(String(end).replace(/[^0-9]/g, ''), 10) || 0

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * numericEnd))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, startCounting])

  return count
}
