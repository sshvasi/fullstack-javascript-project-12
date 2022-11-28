/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  channelId: null,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, channelId } = action.payload;
      state.isOpened = true;
      state.type = type;
      state.channelId = channelId;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const selectModalType = (state) => state.modal.type;

export const { openModal, closeModal } = modalsSlice.actions;
