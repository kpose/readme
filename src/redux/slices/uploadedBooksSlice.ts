import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {ThumbnailResult} from 'react-native-pdf-thumbnail';

export interface IPDFBook {
  location: string;
  name: string;
  downloadUrl: string;
  thumbnail: ThumbnailResult;
  id: string;
}
interface IUploadedBooksState {
  books: IPDFBook[];
}

const initialState: IUploadedBooksState = {
  books: [],
};

export const uploadedBooksSlice = createSlice({
  name: 'uploadedBooks',
  initialState: initialState.books,
  reducers: {
    updateBookStore: (state, action: PayloadAction<IPDFBook>) => {
      state.unshift(action.payload);
    },
  },
});

export const {updateBookStore} = uploadedBooksSlice.actions;

export const uploadedPDFBooks = (state: RootState) => state.books;

export default uploadedBooksSlice.reducer;
