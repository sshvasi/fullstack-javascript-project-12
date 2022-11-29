/* eslint-disable no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

const BASE_URL = '/api/v1';
const DEFAULT_CHANNEL_ID = 1;
const SOCKET_TIMEOUT = 2000;

const socket = io();

const socketEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const emit = (eventName) => (message) => {
  return new Promise((resolve) => {
    socket.timeout(SOCKET_TIMEOUT).emit(eventName, message, (error, data) => {
      if (error) resolve({ error });
      else resolve({ data });
    });
  });
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

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

    createChannel: builder.mutation({
      queryFn: emit(socketEvents.newChannel),
    }),
    removeChannel: builder.mutation({
      queryFn: emit(socketEvents.removeChannel),
    }),
    renameChannel: builder.mutation({
      queryFn: emit(socketEvents.renameChannel),
    }),
    sendMessage: builder.mutation({
      queryFn: emit(socketEvents.newMessage),
    }),

    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
      }),
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          socket.on(socketEvents.newChannel, (channel) => {
            updateCachedData((draft) => {
              draft.channels.push(channel);
              draft.currentChannelId = channel.id;
            });
          });

          socket.on(socketEvents.renameChannel, ({ id, name }) => {
            updateCachedData((draft) => {
              const channel = draft.channels.find((channel) => channel.id === id);
              channel.name = name;
            });
          });

          socket.on(socketEvents.removeChannel, ({ id }) => {
            updateCachedData((draft) => {
              draft.channels = draft.channels.filter((channel) => channel.id !== id);
              draft.currentChannelId = DEFAULT_CHANNEL_ID;
            });
          });
        } catch (error) {
          console.log(error);
        }

        await cacheEntryRemoved;
      },
    }),

    getMessages: builder.query({
      query: () => ({
        url: '/messages',
        method: 'GET',
      }),
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        try {
          await cacheDataLoaded;

          socket.on(socketEvents.newMessage, (message) => {
            updateCachedData((draft) => {
              draft.messages.push(message);
            });
          });

          socket.on(socketEvents.removeChannel, ({ id }) => {
            updateCachedData((draft) => {
              draft.messages = draft.messages.filter((message) => message.channelId !== id);
            });
          });
        } catch (error) {
          console.log(error);
        }

        await cacheEntryRemoved;
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGetChannelsQuery,
  useCreateChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = apiSlice;
