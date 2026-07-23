import { baseApi } from './baseApi';

export const partnersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query({
      query: (lang = 'ar') => ({
        url: 'partners',
        headers: {
          Accept: 'application/json',
          'Accept-Language': lang,
        },
      }),
    }),
  }),
});

export const { useGetPartnersQuery } = partnersApi;
