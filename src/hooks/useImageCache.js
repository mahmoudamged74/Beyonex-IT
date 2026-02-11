import { useState, useEffect } from "react";

export function useCachedImage(src) {
  const [isCached, setIsCached] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setIsCached(true)
  }, [src])

  return { isCached, onLoad: () => {} }
}
