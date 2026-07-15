export function fingerprint(value) {
  return JSON.stringify(value);
}

export function isSamePayload(a, b) {
  if (a === b) return true;
  if (a === undefined || b === undefined) return false;
  return fingerprint(a) === fingerprint(b);
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
