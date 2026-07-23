/** Optional background sync — set VITE_API_POLLING_MS to enable (e.g. 60000). */
const DEFAULT_POLLING_MS = 0;

const sharedQueryOptions = {
  refetchOnFocus: false,
  refetchOnReconnect: true,
  skipPollingIfUnfocused: true,
};

/** Shared query options — fetch once, refetch on reconnect or tab return. */
export const LIVE_QUERY_OPTIONS = {
  ...sharedQueryOptions,
  pollingInterval: Number(import.meta.env.VITE_API_POLLING_MS) || DEFAULT_POLLING_MS,
};

/** Fetch once and reuse cache — no background polling. */
export const STATIC_QUERY_OPTIONS = {
  ...sharedQueryOptions,
  pollingInterval: 0,
};
