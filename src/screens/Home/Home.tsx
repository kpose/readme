import {Alert} from 'react-native';
import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {requestFilePermission} from '../../utils/Permissions.util';
import {selectPdf} from '../../utils/FilePicker.util';
import DocumentPicker from 'react-native-document-picker';
import useCloudStorage from '../../hooks/CloudStorage.hook';

const Home = () => {
  const {uploadFileToFirestore} = useCloudStorage();

  const onImportPress = useCallback(async () => {
    try {
      const filesPermission = await requestFilePermission();
      if (filesPermission === 'granted') {
        const pdfFile = await selectPdf();
        await uploadFileToFirestore(pdfFile);
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
      Alert.alert('Error', e.message);
    }
  }, [uploadFileToFirestore]);

  return (
    <Screen>
      <Text>Home</Text>
      <FolderIcon size={15} />

      <UploadedDocs />

      <FAB onImportPress={onImportPress} />
      {/* {jjj && <DocumentView document={jjj} showLeadingNavButton={true} />} */}
    </Screen>
  );
};

export default Home;
