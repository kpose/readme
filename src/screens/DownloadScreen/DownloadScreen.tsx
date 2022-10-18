import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import FAB from '../../components/FAB/FAB';
import UploadedDocs from '../../components/UploadedDocs/UploadedDocs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text/Text';
import {usePDFViewer} from '../../providers/PDFViewerProvider';

const DownloadScreen = () => {
  const {uploadPDF, isUploadingPDF} = useFileUpload();
  const {openDocument} = usePDFViewer();

  const onImportPress = useCallback(async () => {
    await uploadPDF()
      .then(resp => {
        console.log(resp);
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

  // if (isUploadingPDF) {
  //   return (
  //     <View style={styles.uploading}>
  //       <Text>Processing PDF...</Text>
  //     </View>
  //   );
  // }

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

const styles = StyleSheet.create({
  uploading: {
    flex: 1,
    position: 'absolute',
    opacity: 0.3,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jjjj: {
    // textAlign: 'center',
    // alignSelf: 'center',
  },
});
export default DownloadScreen;
