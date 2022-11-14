import { configureStore } from '@reduxjs/toolkit';

import { authSlice, listenerMiddleware } from '@/slices/authSlice';
import { apiSlice } from '@/slices/apiSlice';
import { modalsSlice } from '@/slices/modalsSlice';
import { drawerSlice } from '@/slices/drawerSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [modalsSlice.name]: modalsSlice.reducer,
    [drawerSlice.name]: drawerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      listenerMiddleware.middleware,
      apiSlice.middleware,
    ),
});
