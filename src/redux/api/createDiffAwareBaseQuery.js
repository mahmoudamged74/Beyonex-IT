import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCachedQueryData, isSamePayload } from '../utils/responseFingerprint';

export function createDiffAwareBaseQuery(baseQueryOptions, reducerPath) {
  const rawBaseQuery = fetchBaseQuery(baseQueryOptions);

  return async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error || result.data === undefined) {
      return result;
    }

    const cached = getCachedQueryData(
      api.getState(),
      reducerPath,
      api.endpoint,
      args,
    );

    if (cached !== undefined && isSamePayload(cached, result.data)) {
      return {
        data: cached,
        meta: { ...(result.meta || {}), unchanged: true },
      };
    }

    return result;
  };
}
