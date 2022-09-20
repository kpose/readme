import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import {selectPdf} from '../utils/FilePicker.util';
import {requestFilePermission} from '../utils/Permissions.util';
import {useUser} from './UserProvider';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useAppDispatch /* useAppSelector */} from '../hooks/ReduxState.hook';
import {updateBookStore, IPDFBook} from '../redux/slices/uploadedBooksSlice';
import PdfThumbnail from 'react-native-pdf-thumbnail';
import {getUniqueID} from '../utils/Helpers.util';

interface IFileUploadContext {
  isUploadingFile: boolean;
  uploadPDF?: () => Promise<IPDFBook | undefined>;
}

const initialState = {
  isUploadingFile: false,
};

interface FileUploadProps {
  children: React.ReactNode;
}
const FileUploadContext = createContext<IFileUploadContext>(initialState);

export const FileUploadProvider: FC<FileUploadProps> = ({children}) => {
  const {user} = useUser();
  const [isUploading, setIsUploading] = useState(false);
  //   const books = useAppSelector(state => state.books.books);
  const dispatch = useAppDispatch();

  const uploadAndSavePDF = useCallback(async () => {
    try {
      if (!user?.email) {
        return Promise.reject('Please log out and log in again');
      }
      const filesPermission = await requestFilePermission();
      if (filesPermission === 'granted') {
        // pick single pdf and get temp location
        const filePath = await selectPdf();
        if (Object.keys(filePath).length === 0) {
          let error = 'Please make sure you have selected a pdf document';
          return Promise.reject(error);
        }

        let destPath = RNFS.DocumentDirectoryPath + '/' + `${filePath.name}`;
        let decodedURL = decodeURIComponent(filePath.uri);
        let ID = getUniqueID(10);
        const thumbnail = await PdfThumbnail.generate(filePath.uri, 0);
        let bookData = {
          id: ID,
          name: filePath.name,
          location: destPath,
          downloadUrl: decodedURL,
          thumbnail: thumbnail,
        };
        await RNFS.moveFile(decodedURL, destPath)
          .then(() =>
            // write file details to redux
            dispatch(updateBookStore(bookData)),
          )
          .catch(err => Promise.reject(err));
        return Promise.resolve(bookData);
      }
      if (filesPermission === 'unavailable') {
        throw new Error(
          'Sorry but this feature appears to be unavailable on your device.',
        );
      }
      throw new Error(
        'Please go into settings and grant Readme access to read your files to use this feature.',
      );
    } catch (e: any) {
      // handle error
      if (DocumentPicker.isCancel(e)) {
        return;
      }
    }
  }, [dispatch, user?.email]);

  return (
    <FileUploadContext.Provider
      value={{
        isUploadingFile: isUploading,
        uploadPDF: uploadAndSavePDF,
      }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUpload = () => useContext(FileUploadContext);
