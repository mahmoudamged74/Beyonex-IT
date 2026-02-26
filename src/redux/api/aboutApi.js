import { baseApi } from './baseApi';

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: (lang) => ({
        url: 'about',
        headers: {
          'Accept-Language': lang,
        },
      }),
    }),
  }),
});

export const { useGetAboutQuery } = aboutApi;
