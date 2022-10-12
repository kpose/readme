/* File Upload Provider Interfaces */

import {IPDFBook} from '../redux/slices/uploadedBooksSlice';

interface IBookContent {
  _id: string;
  body: string;
  page: number;
}
export interface IPdfBook {
  _id: string;
  url: string;
  tilte: string;
  content: IBookContent[];
}
export interface IUploadedBookProps {
  message: string;
  books: IPDFBook[];
}

export interface IFileUploadContext {
  isUploadingPDF: boolean;
  uploadPDF: () => Promise<IUploadedBookProps>;
}
