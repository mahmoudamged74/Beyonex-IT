import { baseApi } from './baseApi';

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: (lang = 'ar') => ({
        url: 'home',
        headers: {
          'Accept-Language': lang,
        },
      }),
    }),
  }),
});

export const { useGetHomeDataQuery } = homeApi;
