import { baseApi } from './baseApi';

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: (lang = 'ar') => ({
        url: 'settings',
        headers: {
          'Accept-Language': lang,
        },
      }),
    }),
  }),
});

export const { useGetSettingsQuery } = settingsApi;
