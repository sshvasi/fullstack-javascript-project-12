/* eslint-disable no-param-reassign */
import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit';

const preloadedState = JSON.parse(localStorage.getItem('auth'));

const initialState = {
  username: preloadedState?.username ?? null,
  token: preloadedState?.token ?? null,
  isAuthenticated: !!preloadedState?.token,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      state.isAuthenticated = !!token;
    },
    removeUser: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setUser,
  effect: (action) => {
    const { username, token } = action.payload;
    localStorage.setItem('auth', JSON.stringify({ username, token }));
  },
});

listenerMiddleware.startListening({
  actionCreator: removeUser,
  effect: () => {
    localStorage.removeItem('auth');
  },
});
