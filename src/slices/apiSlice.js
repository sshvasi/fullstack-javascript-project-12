import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

const socket = io();

const socketEvents = {
  newMessage: 'newMessage',
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

const emit = (eventName) => (payload) => {
  return new Promise((resolve) => {
    socket.emit(eventName, payload, (response) => {
      resolve({ data: response });
    });
  });
};

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
    // Initially fetch channels and messages by GET query,
    // then wait for a socket event and update cache with its data.
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
      }),
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
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
              const channel = draft.channels.find((c) => c.id === id);
              channel.name = name;
            });
          });

          socket.on(socketEvents.removeChannel, ({ id }) => {
            updateCachedData((draft) => {
              draft.channels = draft.channels.filter((c) => c.id !== id);
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
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
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
