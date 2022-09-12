import {Alert} from 'react-native';
import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {requestFilePermission} from '../../utils/Permissions.util';
import {selectPdf} from '../../utils/FilePicker.util';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {useUser} from '../../providers/UserProvider';
import useCloudStorage from '../../hooks/CloudStorage.hook';

const Home = () => {
  const {user} = useUser();
  const {uploadFile} = useCloudStorage();

  const handleFileSelected = useCallback(
    async (selectedFile: DocumentPickerResponse) => {
      if (!selectedFile || !user?.email) {
        return;
      }
      await uploadFile(selectedFile, user.email);
    },
    [uploadFile, user],
  );

  const onImportPress = useCallback(async () => {
    try {
      const filesPermission = await requestFilePermission();
      if (filesPermission === 'granted') {
        const pdfFile = await selectPdf();
        return handleFileSelected(pdfFile);
      }
      if (filesPermission === 'unavailable') {
        throw new Error(
          'Sorry but this feature appears to be unavailable on your device.',
        );
      }
      throw new Error(
        'Please go into settings and grant Flutterwave access to read your files to use this feature.',
      );
    } catch (e: any) {
      // handle error
      if (DocumentPicker.isCancel(e)) {
        return;
      }
      Alert.alert('Error', e.message);
    }
  }, [handleFileSelected]);

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
