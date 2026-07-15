import { createApi } from '@reduxjs/toolkit/query/react';
import { createDiffAwareBaseQuery } from './createDiffAwareBaseQuery';

export const baseApiReducerPath = 'api';

export const baseApi = createApi({
  reducerPath: baseApiReducerPath,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: createDiffAwareBaseQuery(
    {
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    },
    baseApiReducerPath,
  ),
  tagTypes: [],
  endpoints: () => ({}),
});
