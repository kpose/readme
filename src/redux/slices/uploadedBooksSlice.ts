import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {ThumbnailResult} from 'react-native-pdf-thumbnail';

export interface IPDFBook {
  location: string;
  name: string;
  downloadUrl: string;
  thumbnail: ThumbnailResult;
}
interface IUploadedBooksState {
  books: IPDFBook[];
}

const initialState: IUploadedBooksState = {
  books: [],
};

export const uploadedBooksSlice = createSlice({
  name: 'uploadedBooks',
  initialState,
  reducers: {
    updateBookStore: (state, action: PayloadAction<IPDFBook>) => {
      state.books.push(action.payload);
    },
  },
});

export const {updateBookStore} = uploadedBooksSlice.actions;

export const uploadedPDFBooks = (state: RootState) => state.books;

export default uploadedBooksSlice.reducer;
