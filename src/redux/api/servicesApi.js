import { baseApi } from './baseApi';

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (lang) => ({
        url: 'services',
        headers: {
          'Accept-Language': lang,
        },
      }),
    }),
    getServiceDetails: builder.query({
      query: ({ slug, lang }) => ({
        url: `services/${slug}`,
        headers: {
          'Accept-Language': lang,
        },
      }),
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceDetailsQuery } = servicesApi;
