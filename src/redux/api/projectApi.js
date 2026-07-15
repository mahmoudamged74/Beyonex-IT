import { createApi } from "@reduxjs/toolkit/query/react";
import { createDiffAwareBaseQuery } from "./createDiffAwareBaseQuery";

export const projectApiReducerPath = "projectApi";

export const projectApi = createApi({
  reducerPath: projectApiReducerPath,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  baseQuery: createDiffAwareBaseQuery(
    {
      baseUrl: import.meta.env.VITE_SYSTEM_API_URL || "https://system.beyonexit.com/api",
    },
    projectApiReducerPath,
  ),
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: (lng) => ({
        url: `/website/1/branches`,
        headers: {
          "Accept-Language": lng || "ar",
          "Accept": "application/json",
        },
      }),
    }),
    registerProject: builder.mutation({
      query: (data) => ({
        url: `/website/1/register`,
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetBranchesQuery, useRegisterProjectMutation } = projectApi;
