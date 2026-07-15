/** Optional background sync — set VITE_API_POLLING_MS to enable (e.g. 120000). */
const DEFAULT_POLLING_MS = 0;

const sharedQueryOptions = {
  refetchOnFocus: false,
  refetchOnReconnect: true,
  skipPollingIfUnfocused: true,
};

/** Used by LiveDataSync for CMS content that may change in the dashboard. */
export const LIVE_QUERY_OPTIONS = {
  ...sharedQueryOptions,
  pollingInterval: Number(import.meta.env.VITE_API_POLLING_MS) || DEFAULT_POLLING_MS,
};

/** Fetch once and reuse cache — no background polling. */
export const STATIC_QUERY_OPTIONS = {
  ...sharedQueryOptions,
  pollingInterval: 0,
};
