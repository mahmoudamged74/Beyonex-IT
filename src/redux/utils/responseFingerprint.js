const VOLATILE_KEYS = new Set(['created_at', 'updated_at']);

function stripVolatileFields(value) {
  if (Array.isArray(value)) {
    return value.map(stripVolatileFields);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((acc, [key, nested]) => {
      if (!VOLATILE_KEYS.has(key)) {
        acc[key] = stripVolatileFields(nested);
      }
      return acc;
    }, Array.isArray(value) ? [] : {});
  }

  return value;
}

export function normalizePayloadForCompare(value) {
  return stripVolatileFields(value);
}

export function fingerprint(value) {
  return JSON.stringify(value);
}

/** Short URL-safe hash for cache-bust query params. */
export function hashString(value) {
  const str = typeof value === 'string' ? value : fingerprint(value);
  let hash = 5381;

  for (let i = 0; i < str.length; i += 1) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }

  return (hash >>> 0).toString(36);
}

export function isSamePayload(a, b) {
  if (a === b) return true;
  if (a === undefined || b === undefined) return false;
  return (
    fingerprint(normalizePayloadForCompare(a)) ===
    fingerprint(normalizePayloadForCompare(b))
  );
}

export function getCachedQueryData(state, reducerPath, endpointName, args) {
  const queries = state?.[reducerPath]?.queries;
  if (!queries) return undefined;

  for (const entry of Object.values(queries)) {
    if (
      entry?.endpointName === endpointName &&
      entry.status === 'fulfilled' &&
      isSameArgs(entry.originalArgs, args)
    ) {
      return entry.data;
    }
  }

  return undefined;
}

function isSameArgs(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  return fingerprint(a) === fingerprint(b);
}
