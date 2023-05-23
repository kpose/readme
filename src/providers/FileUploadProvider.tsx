import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import {selectPdf} from '../utils/FilePicker.util';
import {requestFilePermission} from '../utils/Permissions.util';
import DocumentPicker from 'react-native-document-picker';
import {useAppDispatch, useAppSelector} from '../hooks/ReduxState.hook';
import {
  updateBooks,
  IPDFBook,
  deleteBook,
} from '../redux/slices/uploadedBooksSlice';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import {asyncGet} from '../utils/Async.util';
import {STORE_KEYS} from '../utils/Keys.util';
import {getUniqueID} from '../utils/Helpers.util';
import {RootState} from '../redux/store';
import RNFS from 'react-native-fs';

const initialState = {
  isUploadingPDF: false,
  isFetchingBooks: false,
  uploadPDF: () => {},
  getUserBooks: () => {},
  deletePDF: () => {},
};
interface IFileUploadProviderProps {
  children: React.ReactNode;
}

interface IFileUploadContext {
  isUploadingPDF: boolean;
  isFetchingBooks: boolean;
  uploadPDF: () => Promise<string | undefined>;
  getUserBooks: (mode: 'incognito' | 'live') => Promise<any>;
  deletePDF: (id: string) => Promise<any>;
}

const FileUploadContext = createContext<IFileUploadContext>(initialState);

export const FileUploadProvider: FC<IFileUploadProviderProps> = ({
  children,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const SAVEDBOOKS = useAppSelector((state: RootState) => state.books);
  const dispatch = useAppDispatch();

  const uploadAndSavePDF = useCallback(async () => {
    try {
      const filesPermission = await requestFilePermission();
      const token = await asyncGet(STORE_KEYS.AUTH_TOKEN);
      if (!token) {
        return Promise.reject(
          'Error processing, please logout then log in again',
        );
      }

      if (filesPermission === 'granted') {
        // pick single pdf and get temp location
        const filePath = await selectPdf();
        if (Object.keys(filePath).length === 0) {
          setIsUploading(false);
          let error = 'Please make sure you have selected a pdf document';
          return Promise.reject(error);
        }

        const found = SAVEDBOOKS.some(doc => doc.title === filePath.name);
        if (found) {
          setIsUploading(false);
          let error =
            'This document already exist in your library, please select another';
          return Promise.reject(error);
        }
        setIsUploading(true);

        const firstPage = await PdfThumbnail.generate(filePath.uri, 0);

        const thumbnail = {
          name: `${filePath.name.split('.pdf')}${'-thumbnail.jpeg'}`,
          type: 'image/jpeg',
          uri: firstPage.uri,
        };

        const uploads = [filePath, thumbnail];

        let data = new FormData();

        for (let i = 0; i < uploads.length; i++) {
          data.append('uploads', uploads[i]);
        }

        /* make http call for text extraction */
        const response = await fetch('http://localhost:4000/api/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            // 'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
          body: data,
        });

        let responseInJs = await response.json();

        if (responseInJs.error) {
          setIsUploading(false);
          return Promise.reject(responseInJs.error);
        }

        setIsUploading(false);
        return Promise.resolve('Document have been uploaded successfully');
      }
      if (filesPermission === 'unavailable') {
        setIsUploading(false);
        throw new Error(
          'Sorry but this feature appears to be unavailable on your device.',
        );
      }
      setIsUploading(false);
      throw new Error(
        'Please go into settings and grant Readme access to read your files to use this feature.',
      );
    } catch (e: any) {
      setIsUploading(false);
      if (DocumentPicker.isCancel(e)) {
        return;
      }
    }
  }, [SAVEDBOOKS]);

  /* params here (incogniito or live), is used to determine how to fetch
  the users uploaded books, we run incognito when we dont want to update the 
  isFetching state. We only run on live mode when only uploading new documents, other times 
  we run on incognito when fetching silently */

  const getAllUserBooks = useCallback(
    async (mode: 'incognito' | 'live') => {
      try {
        const token = await asyncGet(STORE_KEYS.AUTH_TOKEN);
        if (!token) {
          return;
        }
        if (mode === 'live') {
          setIsFetching(true);
        }
        const response = await fetch('http://localhost:4000/api/getBooks', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        });

        let responseInJs = await response.json();
        if (responseInJs.error) {
          setIsFetching(false);
          return Promise.reject(responseInJs.error);
        }
        setIsFetching(false);

        // check if database books habve been updated
        let missingBooks = responseInJs.data.filter(
          e => !SAVEDBOOKS.find(a => e.title === a.title),
        );
        // /* update device books storage if necessary*/
        if (missingBooks.length) {
          let newBook = missingBooks[0];
          let bookData: IPDFBook = {
            title: newBook.title,
            id: newBook._id,
            pdfFileUrl: newBook.pdfFileUrl,
            thumbnailFileUrl: newBook.thumbnailFileUrl,
            bookData: newBook.content,
            listening: {currentPage: 0},
          };
          dispatch(updateBooks(bookData));
        }
      } catch (error) {
        setIsFetching(false);
      }
    },
    [SAVEDBOOKS, dispatch],
  );

  const deletePDF = useCallback(
    async (id: string) => {
      try {
        const token = await asyncGet(STORE_KEYS.AUTH_TOKEN);
        if (!token) {
          return;
        }
        setIsDeleting(true);
        const response = await fetch(
          `http://localhost:4000/api/deleteBook/${id}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: token,
            },
          },
        );
        let responseInJs = await response.json();

        if (responseInJs.message) {
          dispatch(deleteBook(id));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch],
  );

  return (
    <FileUploadContext.Provider
      value={{
        isUploadingPDF: isUploading,
        isFetchingBooks: isFetching,
        uploadPDF: uploadAndSavePDF,
        getUserBooks: getAllUserBooks,
        deletePDF: deletePDF,
      }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUpload = () => useContext(FileUploadContext);
