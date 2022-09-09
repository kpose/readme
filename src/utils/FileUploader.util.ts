import Logger from './Logger.util';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';


export async function uploadPDF(
  filePath: any,
  userDirectory: string,
): Promise<FirebaseStorageTypes.Task> {
  try {
    if (Object.keys(filePath).length === 0) {
      let error = 'Please make sure you have selected a document';
      return Promise.reject(error);
    }
    const reference = storage().ref(`/${userDirectory}/${filePath.name}`);
    const task = reference.putFile(filePath.uri.replace('file://', ''));

    task.on('state_changed', taskSnapshot => {
      let percentage =
        (Number(taskSnapshot.bytesTransferred) /
          Number(taskSnapshot.totalBytes)) *
        100;
      console.log(`${percentage}%`);
    });

    task.then(() => {
      console.log('done');
    });

    return Promise.resolve(task);
  } catch (e) {
    // log error
    Logger(e);
    // reject with error
    return Promise.reject(e);
  }
}
