import React, {useCallback, useEffect} from 'react';
import Screen from '../../components/Screen/Screen';
import FAB from '../../components/FAB/FAB';
import UploadedPDFs from '../UploadedPDFs/UploadedPDFs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert, TouchableOpacity} from 'react-native';
import Text from '../../components/Text/Text';
import {usePDFViewer} from '../../providers/PDFViewerProvider';

const HomeScreen = () => {
  const {uploadPDF, isUploadingPDF, getUserBooks} = useFileUpload();
  const {openDocument} = usePDFViewer();

  useEffect(
    function componentDidMount() {
      async function fetchAllUserBooks() {
        await getUserBooks('incognito')
          .then(x => {
            // do nothing
          })
          .catch(error => {
            console.log(error);
          });
      }
      fetchAllUserBooks();
    },
    [getUserBooks],
  );

  const onImportPress = useCallback(async () => {
    await uploadPDF()
      .then(() => {
        getUserBooks('live')
          .then(() => {
            // do nothing
          })
          .catch(err => {
            Alert.alert(err);
          });
      })
      .catch(err => {
        Alert.alert(err);
      });
  }, [getUserBooks, uploadPDF]);

  const openDoc = useCallback(async () => {
    if (openDocument) {
      openDocument(
        'https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf',
      );
    }
  }, [openDocument]);

  return (
    <Screen>
      <UploadedPDFs />
      <FAB onImportPress={onImportPress} disabled={isUploadingPDF} />
      <TouchableOpacity onPress={openDoc}>
        <Text>press</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default HomeScreen;
