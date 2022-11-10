import { configureStore } from '@reduxjs/toolkit';

import { channelsSlice } from '@/slices/channelsSlice';
import { messagesSlice } from '@/slices/messagesSlice';
import { authSlice, listenerMiddleware } from './slices/authSlice';
import { apiSlice } from '@/slices/apiSlice';

export default configureStore({
  reducer: {
    [channelsSlice.name]: channelsSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware, apiSlice.middleware),
});
