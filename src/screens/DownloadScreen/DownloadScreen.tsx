import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import FAB from '../../components/FAB/FAB';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert, TouchableOpacity} from 'react-native';
import Text from '../../components/Text/Text';
import {usePDFViewer} from '../../providers/PDFViewerProvider';

const DownloadScreen = () => {
  const {uploadPDF} = useFileUpload();
  const {openDocument} = usePDFViewer();

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

  const openDoc = useCallback(async () => {
    if (openDocument) {
      openDocument(
        'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf',
      );
    }
  }, [openDocument]);

  return (
    <Screen>
      <UploadedDocs />
      <FAB onImportPress={onImportPress} />
      <TouchableOpacity onPress={openDoc}>
        <Text>press</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default DownloadScreen;
