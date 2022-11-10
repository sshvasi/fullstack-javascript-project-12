import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
    }),
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
      }),
    }),
    getMessages: builder.query({
      query: () => ({
        url: '/messages',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
} = apiSlice;
