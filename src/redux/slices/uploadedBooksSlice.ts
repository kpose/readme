import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {ThumbnailResult} from 'react-native-pdf-thumbnail';

export interface IPDFBookData {
  pageNumber: number;
  text: string;
  _id?: string;
}

export interface IPDFBookReadingData {
  currentPage: number;
}
export interface IPDFBook {
  title: string;
  thumbnailFileUrl: string;
  id: string;
  pdfFileUrl: string;
  bookData: IPDFBookData[];
  listening: IPDFBookReadingData;
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
    deleteBook: (state, action: PayloadAction<string>) => {
      return state.filter(book => book.id !== action.payload);
    },
    updateListening: (
      state,
      action: PayloadAction<{id: string; currentPage: number}>,
    ) => {
      const {id, currentPage} = action.payload;
      const book = state.find(doc => doc.id === id);
      if (!book) {
        return;
      }
      book.listening = {currentPage: currentPage};
      return;
    },
  },
});

export const {updateBooks, updateListening, deleteBook} =
  uploadedBooksSlice.actions;

export const uploadedPDFBooks = (state: RootState) => state.books;

export default uploadedBooksSlice.reducer;
