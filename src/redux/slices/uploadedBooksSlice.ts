import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

export interface IPDFBook {
  location: string;
  name: string;
  downloadUrl: string;
}

interface IUploadedBooksState {
  books: IPDFBook[];
}

// Define the initial state using that type
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

// Other code such as selectors can use the imported `RootState` type
export const uploadedPDFBooks = (state: RootState) => state.books;

export default uploadedBooksSlice.reducer;

// RNFS.downloadFile(options)
//   .promise.then(() => {
//     dispatch(
//       updateBookStore({
//         location: localFile,
//         name: item.name,
//         downloadUrl: url,
//       }),
//     );
//   })
//   .then(() => {
//     // success
//   })
//   .catch(error => {
//     console.log(error);
//     // error
//   });
