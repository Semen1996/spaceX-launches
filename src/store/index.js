import { configureStore } from '@reduxjs/toolkit';
import { apiSpaceX } from './apiSpaceX';

export const store = configureStore({
  reducer: {
      [apiSpaceX.reducerPath]: apiSpaceX.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSpaceX.middleware),
});