import { configureStore } from '@reduxjs/toolkit';

import { channelsSlice } from '@/slices/channelsSlice';
import { messagesSlice } from '@/slices/messagesSlice';
import { apiSlice } from '@/slices/apiSlice';

export default configureStore({
  reducer: {
    [channelsSlice.name]: channelsSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
