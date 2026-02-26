import { baseApi } from './baseApi';

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (body) => ({
        url: 'contact',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubmitContactFormMutation } = contactApi;
