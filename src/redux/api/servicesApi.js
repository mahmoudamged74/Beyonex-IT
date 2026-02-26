import { baseApi } from './baseApi';

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetServiceDetailsQuery } = servicesApi;
