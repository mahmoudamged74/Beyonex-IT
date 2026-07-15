import { useMemo } from 'react';
import { resolveMediaUrl } from '../utils/mediaUrl';
import { useMediaCacheVersion } from './useMediaCacheVersion';

export function useResolvedMediaUrl(value) {
  const cacheVersion = useMediaCacheVersion();

  return useMemo(
    () => resolveMediaUrl(value, cacheVersion),
    [value, cacheVersion],
  );
}
