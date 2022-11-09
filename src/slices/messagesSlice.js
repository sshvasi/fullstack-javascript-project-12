/* eslint-disable no-param-reassign */

import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { removeChannel } from '@/slices/channelsSlice.js';

const token = localStorage.getItem('token');

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await axios.get('/api/v1/messages', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: [],
  reducers: {
    sendMessage: (state, action) => {
      const { message } = action.payload;
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.messages = messages;
      })
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        state.messages = state.messages.filter((message) => message.channelId !== id);
      });
  },
});

export const selectActiveChannelMessages = createSelector(
  [(state) => state.messages, (state) => state.channels.currentChannelId],
  (messages, id) => messages.filter((message) => message.channelId === id),
);

export const { sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
