import { baseApi } from './baseApi';

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: (lang) => ({
        url: `about?_=${Date.now()}`,
        headers: {
          'Accept-Language': lang,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      }),
    }),
  }),
});

export const { useGetAboutQuery } = aboutApi;
