import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTeamMembersSignature } from '../../utils/teamMembersSnapshot';
import { getCachedQueryData, isSamePayload } from '../utils/responseFingerprint';

function extractTeamMembers(payload) {
  return payload?.data?.team_members ?? payload?.team_members ?? [];
}

export function createDiffAwareBaseQuery(baseQueryOptions, reducerPath) {
  const rawBaseQuery = fetchBaseQuery({
    ...baseQueryOptions,
    fetchFn: (input, init) =>
      fetch(input, { ...init, cache: 'no-store' }),
  });

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

    if (cached !== undefined) {
      if (api.endpoint === 'getAbout') {
        const cachedTeamSignature = getTeamMembersSignature(
          extractTeamMembers(cached),
        );
        const nextTeamSignature = getTeamMembersSignature(
          extractTeamMembers(result.data),
        );

        if (cachedTeamSignature !== nextTeamSignature) {
          return result;
        }
      }

      if (isSamePayload(cached, result.data)) {
        return {
          data: cached,
          meta: { ...(result.meta || {}), unchanged: true },
        };
      }
    }

    return result;
  };
}
