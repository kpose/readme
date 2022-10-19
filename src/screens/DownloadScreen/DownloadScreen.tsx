import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import FAB from '../../components/FAB/FAB';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert, TouchableOpacity} from 'react-native';
import Text from '../../components/Text/Text';
import {usePDFViewer} from '../../providers/PDFViewerProvider';

const DownloadScreen = () => {
  const {uploadPDF, isUploadingPDF} = useFileUpload();
  const {openDocument} = usePDFViewer();

  const onImportPress = useCallback(async () => {
    await uploadPDF()
      .then(() => {
        // do nothing
      })
      .catch(err => {
        Alert.alert(err);
      });
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
      <FAB onImportPress={onImportPress} disabled={isUploadingPDF} />
      <TouchableOpacity onPress={openDoc}>
        <Text>press</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default DownloadScreen;
