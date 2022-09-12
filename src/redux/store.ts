import {configureStore, combineReducers} from '@reduxjs/toolkit';
import uploadedBooksReducer from './slices/uploadedBooksSlice';

const rootReducer = combineReducers({
  books: uploadedBooksReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
