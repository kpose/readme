import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {ThumbnailResult} from 'react-native-pdf-thumbnail';

export interface IPDFBook {
  title: string;
  thumbnail?: ThumbnailResult;
  id: string;
  url: string;
  bookData: {pagenumber: number; text: string}[];
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
    updateBooks: (state, action: PayloadAction<IPDFBook>) => {
      state.unshift(action.payload);
    },
  },
});

export const {updateBooks} = uploadedBooksSlice.actions;

export const uploadedPDFBooks = (state: RootState) => state.books;

export default uploadedBooksSlice.reducer;
