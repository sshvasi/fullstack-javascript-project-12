/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpened = true;
    },
    closeDrawer: (state) => {
      state.isOpened = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
