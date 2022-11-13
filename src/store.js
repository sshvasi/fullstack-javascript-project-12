import { configureStore } from '@reduxjs/toolkit';

import { authSlice, listenerMiddleware } from '@/slices/authSlice';
import { apiSlice } from '@/slices/apiSlice';
import { modalsSlice } from '@/slices/modalsSlice';

export default configureStore({
  reducer: {
    [modalsSlice.name]: modalsSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware, apiSlice.middleware),
});
