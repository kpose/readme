import Logger from '../utils/Logger.util';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {useCallback, useState} from 'react';
import {DocumentPickerResponse} from 'react-native-document-picker';

export interface IUseFileHook {
  error?: string;
  uploadFile: (file: DocumentPickerResponse) => void;
  isComplete: boolean;
  percent: number;
}

/**
 * The file upload hook provides and API that can be used to upload a file and
 * get access to the file upload state.
 * @returns IUseFileHook
 */
const useCloudStorage = () => {
  const [percent, setPercent] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

  /**
   * The function is used to upload pdf to firestore storage
   * @returns FirebaseStorageTypes.Task
   */
  const uploadFile = useCallback(
    async (
      filePath: DocumentPickerResponse,
      userDirectory: string,
    ): Promise<FirebaseStorageTypes.Task> => {
      try {
        setIsComplete(false);
        if (Object.keys(filePath).length === 0) {
          let error = 'Please make sure you have selected a document';
          setIsComplete(true);
          return Promise.reject(error);
        }
        const reference = storage().ref(`/${userDirectory}/${filePath.name}`);
        const task = reference.putFile(
          filePath.fileCopyUri.replace('file://', ''),
        );

        task.on('state_changed', taskSnapshot => {
          let percentage =
            (Number(taskSnapshot.bytesTransferred) /
              Number(taskSnapshot.totalBytes)) *
            100;
          setPercent(Math.round(percentage));
        });

        task.then(() => {
          setIsComplete(true);
        });

        return Promise.resolve(task);
      } catch (e: any) {
        setIsComplete(true);
        // log error
        Logger(e);
        // reject with error
        return Promise.reject(e);
      }
    },
    [],
  );

  /**
   * The function is used to get all stored pdf's of the user
   * @returns
   */

  function getAllDocs(userRef: string, pageToken?: string): Promise<any> {
    const ref = storage().ref(userRef);
    return ref
      .list({pageToken})
      .then((result: FirebaseStorageTypes.ListResult) => {
        // Loop over each item
        result.items.forEach(refId => {
          console.log(refId.fullPath);
        });

        if (result.nextPageToken) {
          return getAllDocs(userRef, result.nextPageToken);
        }

        return Promise.resolve(result.items);
      });
  }

  //  return hook props
  return {
    percent,
    isComplete,
    uploadFile,
    getAllDocs,
  };
};

export default useCloudStorage;
