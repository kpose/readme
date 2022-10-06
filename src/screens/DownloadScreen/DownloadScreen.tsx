import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import FAB from '../../components/FAB/FAB';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert} from 'react-native';

const DownloadScreen = () => {
  const {uploadPDF} = useFileUpload();

  const onImportPress = useCallback(async () => {
    if (uploadPDF) {
      await uploadPDF()
        .then(x => {
          console.log(x);
          return;
        })
        .catch(err => {
          Alert.alert(err);
        });
    }
  }, [uploadPDF]);

  return (
    <Screen>
      <UploadedDocs />
      <FAB onImportPress={onImportPress} />
    </Screen>
  );
};

export default DownloadScreen;
