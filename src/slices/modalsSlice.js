/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { apiSlice } from '@/slices/apiSlice';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      console.log('Modal opened: ' + payload.type);
      state.isOpened = true;
      state.type = payload?.type || null;
      state.extra = payload?.extra || null;
    },
    closeModal: () => {
      console.log('Modal closed');
      return initialState;
    },
  },
});

export const selectModalType = (state) => state.modal.type;

export const selectModalExtraChannel = createSelector(
  [apiSlice.endpoints.getChannels.select(), (state) => state.modal.extra.channelId],
  (channels, id) => channels.find((channel) => channel.id === id),
);

export const { openModal, closeModal } = modalsSlice.actions;
