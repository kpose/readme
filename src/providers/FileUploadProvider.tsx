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
import {updateBooks, IPDFBook} from '../redux/slices/uploadedBooksSlice';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import {asyncGet} from '../utils/Async.util';
import {STORE_KEYS} from '../utils/Keys.util';
import {getUniqueID} from '../utils/Helpers.util';
import {RootState} from '../redux/store';

const initialState = {
  isUploadingPDF: false,
  isFetchingBooks: false,
  uploadPDF: () => {},
  getUserBooks: () => {},
};
interface IFileUploadProviderProps {
  children: React.ReactNode;
}

interface IFileUploadContext {
  isUploadingPDF: boolean;
  isFetchingBooks: boolean;
  uploadPDF: () => Promise<string | undefined>;
  getUserBooks: () => Promise<any>;
}

const FileUploadContext = createContext<IFileUploadContext>(initialState);

export const FileUploadProvider: FC<IFileUploadProviderProps> = ({
  children,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const SAVEDBOOKS = useAppSelector((state: RootState) => state.books);
  const dispatch = useAppDispatch();

  const uploadAndSavePDF = useCallback(async () => {
    try {
      const filesPermission = await requestFilePermission();
      const token = await asyncGet(STORE_KEYS.AUTH_TOKEN);
      if (!token) {
        return;
      }

      if (filesPermission === 'granted') {
        setIsUploading(true);
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
            'This document already exist in your library, select another';
          return Promise.reject(error);
        }
        let data = new FormData();
        data.append('pdfFile', filePath);

        /* make http call for text extraction */
        const response = await fetch('http://localhost:4000/api/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
          body: data,
        });

        let responseInJs = await response.json();
        if (responseInJs.error) {
          return Promise.reject(responseInJs.error);
        }

        setIsUploading(false);
        return Promise.resolve(
          'Document have been uploaded/extracted successfully',
        );
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
  }, []);

  const getAllUserBooks = useCallback(async () => {
    try {
      /* make http call for text extraction */
      const token = await asyncGet(STORE_KEYS.AUTH_TOKEN);
      if (!token) {
        return;
      }
      setIsFetching(true);
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
      // check if database books habve been updated
      let missingBooks = responseInJs.data.filter(
        e => !SAVEDBOOKS.find(a => e.title === a.title),
      );
      // const thumbnail = await PdfThumbnail.generate(filePath.uri, 0);

      // /* update device books storage if necessary*/
      if (missingBooks.length) {
        let newBook = missingBooks[0];
        let bookData: IPDFBook = {
          title: newBook.title,
          // thumbnail,
          id: getUniqueID(10),
          url: newBook.url,
          bookData: newBook.content,
        };
        dispatch(updateBooks(bookData));
      }
    } catch (error) {
      setIsFetching(false);
    }
  }, [SAVEDBOOKS, dispatch]);

  return (
    <FileUploadContext.Provider
      value={{
        isUploadingPDF: isUploading,
        isFetchingBooks: isFetching,
        uploadPDF: uploadAndSavePDF,
        getUserBooks: getAllUserBooks,
      }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUpload = () => useContext(FileUploadContext);
