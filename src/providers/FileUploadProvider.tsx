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

import {useAppDispatch /* useAppSelector */} from '../hooks/ReduxState.hook';
import {updateBookStore, IPDFBook} from '../redux/slices/uploadedBooksSlice';
// import PdfThumbnail from 'react-native-pdf-thumbnail';
import {asyncGet} from '../utils/Async.util';
import {STORE_KEYS} from '../utils/Keys.util';

interface IFileUploadContext {
  isUploadingPDF: boolean;
  uploadPDF?: () => Promise<IPDFBook | undefined>;
}

const initialState = {
  isUploadingPDF: false,
};
interface FileUploadProps {
  children: React.ReactNode;
}
const FileUploadContext = createContext<IFileUploadContext>(initialState);

export const FileUploadProvider: FC<FileUploadProps> = ({children}) => {
  const [isUploading, setIsUploading] = useState(false);
  //   const books = useAppSelector(state => state.books.books);
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
        // console.log(filePath);
        // return;
        if (Object.keys(filePath).length === 0) {
          setIsUploading(false);
          let error = 'Please make sure you have selected a pdf document';
          return Promise.reject(error);
        }
        let data = new FormData();
        data.append('pdfFile', filePath);

        const responseOfFileUpload = await fetch(
          'http://localhost:4000/api/upload',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: token,
            },
            body: data,
          },
        );
        let responseInJs = await responseOfFileUpload.json();
        setIsUploading(false);

        return Promise.resolve(responseInJs);
      }
      if (filesPermission === 'unavailable') {
        setIsUploading(false);
        throw new Error(
          'Sorry but this feature appears to be unavailable on your device.',
        );
      }
      throw new Error(
        'Please go into settings and grant Readme access to read your files to use this feature.',
      );
    } catch (e: any) {
      if (DocumentPicker.isCancel(e)) {
        return;
      }
    }
  }, []);

  return (
    <FileUploadContext.Provider
      value={{
        isUploadingPDF: isUploading,
        uploadPDF: uploadAndSavePDF,
      }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUpload = () => useContext(FileUploadContext);
