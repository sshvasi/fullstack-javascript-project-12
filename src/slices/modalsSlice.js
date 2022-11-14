/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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

export const { openModal, closeModal } = modalsSlice.actions;
