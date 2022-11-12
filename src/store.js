import { configureStore } from '@reduxjs/toolkit';

import { authSlice, listenerMiddleware } from '@/slices/authSlice';
import { apiSlice } from '@/slices/apiSlice';

export default configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware, apiSlice.middleware),
});
