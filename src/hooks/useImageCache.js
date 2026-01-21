const imageCache = new Set()

export function useCachedImage(src) {
  const isCached = imageCache.has(src)

  const onLoad = () => {
    imageCache.add(src)
  }

  return { isCached, onLoad }
}
