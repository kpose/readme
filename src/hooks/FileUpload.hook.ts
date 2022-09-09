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
const useFileUpload = () => {
  const [percent, setPercent] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);

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
        const task = reference.putFile(filePath.uri.replace('file://', ''));

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
      } catch (e) {
        setIsComplete(true);
        // log error
        Logger(e);
        // reject with error
        return Promise.reject(e);
      }
    },
    [],
  );
  //  return hook props
  return {
    percent,
    isComplete,
    uploadFile,
  };
};

export default useFileUpload;
