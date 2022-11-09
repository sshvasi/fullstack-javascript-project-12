/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');
const defaultChannelId = 1;

const initialState = {
  channels: [],
  currentChannelId: null,
  status: 'idle',
  error: null,
};

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const response = await axios.get('/api/v1/channels', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    createChannel: (state, action) => {
      const { channel } = action.payload;
      state.channels.push(channel);
      state.currentChannelId = channel.id;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = defaultChannelId;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const existingChannel = state.channels.find((channel) => channel.id === id);
      existingChannel.name = name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.status = 'succeeded';
        state.channels = channels;
        state.currentChannelId = currentChannelId;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectChannelsProcessState = (state) => ({
  status: state.status,
  error: state.error,
});

export const selectChannels = (state) => state.channels.channels;

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export const selectActiveChannel = (state) =>
  state.channels.channels.find((channel) => channel.id === state.channels.currentChannelId);

export const { setCurrentChannel, createChannel, removeChannel, renameChannel } =
  channelsSlice.actions;
