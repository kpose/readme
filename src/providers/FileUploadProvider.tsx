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
        const thumbnail = await PdfThumbnail.generate(filePath.uri, 0);
        let bookData = {
          name: filePath.name,
          location: destPath,
          downloadUrl: decodedURL,
          thumbnail: thumbnail,
        };
        await RNFS.moveFile(decodedURL, destPath).then(() =>
          // write file details to redux
          dispatch(updateBookStore(bookData)),
        );
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

// UPLOAD TO FIREBASE
// upload selected file to firestore storage
// const reference = await storage().ref(
//   `/${user.email}/${filePath.name}`,
// );
// const task = reference.putFile(
//   filePath.fileCopyUri.replace('file://', ''),
// );
// task.on('state_changed', taskSnapshot => {
//   let percentage =
//     (Number(taskSnapshot.bytesTransferred) /
//       Number(taskSnapshot.totalBytes)) *
//     100;
//   setPercent(Math.round(percentage));
// });
// return Promise.resolve(task);

/* OTHER FUNCTIONS */
// const getAndWritePdf = useCallback(
//   async (doc: FirebaseStorageTypes.Reference[]) => {
//     if (!doc) {
//       return Alert.alert('please select a documnet');
//     }
//     try {
//       for (const item of doc) {
//         const url = await storage()
//           .ref(item.fullPath)
//           .getDownloadURL()
//           .catch(e => {
//             return Promise.reject(e);
//           });
//         if (!url) {
//           return Promise.reject('Error something went wrong');
//         }
//         const localFile = `${RNFS.DocumentDirectoryPath}/${item.name}`;
//         const options = {
//           fromUrl: url,
//           toFile: localFile,
//         };
//         const found = books.some(el => {
//           return el.name === item.name || el.downloadUrl === url;
//         });
//         if (!found) {
//           RNFS.downloadFile(options)
//             .promise.then(async () => {
//               console.log('ioioio');
//               const filePath = localFile;
//               const page = 0;

//               const {uri, width, height} = await PdfThumbnail.generate(
//                 filePath,
//                 page,
//               );

//               console.log(uri, width, height);
//               // get pdf thumbnail

//               dispatch(
//                 updateBookStore({
//                   location: localFile,
//                   name: item.name,
//                   downloadUrl: url,
//                 }),
//               );
//             })
//             .then(() => {
//               Promise.resolve(books);
//             })
//             .catch(error => {
//               console.log(error);
//             });
//         }
//         return;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   [books, dispatch],
// );

// const getAllUploadedPDFs = useCallback(
//   (pageToken?: string): Promise<FirebaseStorageTypes.Reference[]> => {
//     if (!user?.email) {
//       return Promise.reject('Error getting user');
//     }
//     try {
//       const ref = storage().ref(user.email);
//       const items = ref
//         .list({pageToken})
//         .then((result: FirebaseStorageTypes.ListResult) => {
//           // Loop over each item
//           result.items.forEach(refId => {
//             // console.log(refId.fullPath);
//           });
//           if (result.nextPageToken) {
//             return getAllUploadedPDFs(result.nextPageToken);
//           }
//           return result.items;
//         });
//       return Promise.resolve(items);
//     } catch (error) {
//       Promise.reject(error);
//     }
//   },
//   [user?.email],
// );
