import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Logger from './Logger.util';

export async function selectPdf(): Promise<DocumentPickerResponse> {
  try {
    // pick odf file
    const file = await DocumentPicker.pickSingle({
      type: DocumentPicker.types.pdf,
      copyTo: 'cachesDirectory',
    });
    // resolve selected file
    return Promise.resolve(file);
  } catch (e) {
    // log error
    Logger(e);
    // reject with error
    return Promise.reject(e);
  }
}
