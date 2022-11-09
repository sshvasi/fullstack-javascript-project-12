import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
    }),
    getChannels: builder.query({
      query: () => '/channels',
    }),
    getMessages: builder.query({
      query: () => '/messages',
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetChannelsQuery, useGetMessagesQuery } =
  apiSlice;
