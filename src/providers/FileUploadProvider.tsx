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
import {useAppDispatch} from '../hooks/ReduxState.hook';
import {updateBooks, IPDFBook} from '../redux/slices/uploadedBooksSlice';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import {asyncGet} from '../utils/Async.util';
import {STORE_KEYS} from '../utils/Keys.util';
import {IFileUploadContext} from './interfaces';
import {getUniqueID} from '../utils/Helpers.util';

const initialState = {
  isUploadingPDF: false,
};
interface IFileUploadProviderProps {
  children: React.ReactNode;
}
const FileUploadContext = createContext<IFileUploadContext>(initialState);

export const FileUploadProvider: FC<IFileUploadProviderProps> = ({
  children,
}) => {
  const [isUploading, setIsUploading] = useState(false);
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

        /* sort pdf pages */
        responseInJs.data.sort(function (a, b) {
          return a.pageNumber - b.pageNumber;
        });

        /* save book information to redux */
        const thumbnail = await PdfThumbnail.generate(filePath.uri, 0);

        let bookData: IPDFBook = {
          name: filePath.name,
          thumbnail,
          id: getUniqueID(10),
          bookData: responseInJs.data,
        };
        dispatch(updateBooks(bookData));

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
  }, [dispatch]);

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
