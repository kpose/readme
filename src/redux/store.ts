import {configureStore} from '@reduxjs/toolkit';
import uploadedBooksReducer from './slices/uploadedBooksSlice';

export const store = configureStore({
  reducer: {
    uploadedBooks: uploadedBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
