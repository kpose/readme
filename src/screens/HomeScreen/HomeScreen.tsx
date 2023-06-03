import React, {useCallback, useEffect} from 'react';
import FAB from '../../components/FAB/FAB';
import UploadedPDFs from '../UploadedPDFs/UploadedPDFs';
import {useFileUpload} from '../../providers/FileUploadProvider';
import {Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import Text from '../../components/Text/Text';
import {usePDFViewer} from '../../providers/PDFViewerProvider';
import {useAppSelector} from '../../hooks/ReduxState.hook';
import {RootState} from '../../redux/store';

const HomeScreen = () => {
  const {uploadPDF, isUploadingPDF, getUserBooks} = useFileUpload();
  const {openDocument} = usePDFViewer();
  const books = useAppSelector((state: RootState) => state.books);

  useEffect(
    function componentDidMount() {
      const mode = books.length ? 'incognito' : 'live';
      async function fetchAllUserBooks() {
        await getUserBooks(mode)
          .then(x => {
            // do nothing
          })
          .catch(error => {
            console.log(error);
          });
      }
      fetchAllUserBooks();
    },
    [books, getUserBooks],
  );

  const onImportPress = useCallback(async () => {
    await uploadPDF()
      .then(() => {
        getUserBooks('live')
          .then(x => {
            console.log(x);
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
    <SafeAreaView
      style={{
        // backgroundColor: 'blue',
        flex: 1,
        // marginHorizontal: 16,
        // marginTop: 20,
      }}>
      <UploadedPDFs />
      <FAB onImportPress={onImportPress} disabled={isUploadingPDF} />
      <TouchableOpacity onPress={openDoc}>
        <Text>press</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
