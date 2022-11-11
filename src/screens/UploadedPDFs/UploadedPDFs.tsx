import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  ListRenderItem,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text from '../../components/Text/Text';
import {RootState} from '../../redux/store';
import {useAppSelector} from '../../hooks/ReduxState.hook';
import {appcolors} from '../../utils/colors.util';
import {IPDFBook} from '../../redux/slices/uploadedBooksSlice';
import {IOpenDocProps} from './interfaces';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import {ReadIcon, ListenIcon} from '../../components/Icon/Icon';
import {useNavigation} from '@react-navigation/native';
import SpeachText from '../../components/Text/SpeachText';
import {useSpeach} from '../../providers/SpeachProvider';
import {useFileUpload} from '../../providers/FileUploadProvider';
// import {usePDFViewer} from '../../providers/PDFViewerProvider';

const pdfWidth = 120;
const pdfHeight = 190;
const EmptyDirectoryText =
  'Your library looks empty, click the button below to add your first document.';

const UploadedPDFs = () => {
  const books = useAppSelector((state: RootState) => state.books);
  const [openModal, setopenModal] = useState<boolean>(false);
  const [openDoc, setOpenDoc] = useState<IOpenDocProps>();
  const navigation = useNavigation();
  const [isSpeachActive, setIsSpeachActive] = useState(false);
  const {startSpeach} = useSpeach();
  const {isUploadingPDF, isFetchingBooks} = useFileUpload();

  const kkk = {
    title: 'Processing ...',
    id: '20',
    url: 'https://google.com',
    bookData: [],
    listening: {currentPage: 0},
  };
  const DummyBooks = [kkk, ...books];
  // const {openDocument} = usePDFViewer();

  useEffect(() => {
    // console.log(books);
  }, [books]);

  useEffect(() => {
    if (!books.length && !IsProcessing()) {
      setIsSpeachActive(true);
      setTimeout(() => {
        startSpeach(EmptyDirectoryText);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books.length]);

  const onDismiss = () => {
    setopenModal(false);
  };

  /* check if document is currently being uploaded */
  const IsProcessing = useCallback(() => {
    // return isFetchingBooks || isFetchingBooks;
    if (isUploadingPDF) {
      return true;
    }
    return false;
  }, [isUploadingPDF]);

  // console.log(IsProcessing());

  const handleDocPress = useCallback(
    (doc: IPDFBook) => {
      if (openModal || IsProcessing()) {
        return;
      }
      // set bottom sheet details
      setOpenDoc({title: doc.title});
      // open modal
      setopenModal(true);
    },
    [IsProcessing, openModal],
  );

  const onReadPress = useCallback(() => {
    console.log('reading');
  }, []);

  const onListenPress = useCallback(() => {
    setopenModal(false);
    navigation.navigate(
      'ListenScreen' as never,
      {title: openDoc?.title} as never,
    );
  }, [navigation, openDoc?.title]);

  const BottomSheetContent = () => {
    return (
      <View>
        <Image
          source={require('../../assets/images/thumbnail.png')}
          style={styles.bottomSheetThumbnail}
          resizeMode="contain"
        />
        <Text weight="bold" style={styles.title}>
          Title: {openDoc?.title.split('.pdf')}
        </Text>

        <View style={styles.sheetButtonsContainer}>
          {/* Listen button */}
          <Pressable style={styles.sheetButton} onPress={onListenPress}>
            <Text weight="bold" style={styles.sheetText}>
              Listen
            </Text>
            <ListenIcon />
          </Pressable>

          {/* Read button */}
          <Pressable style={styles.sheetButton} onPress={onReadPress}>
            <Text weight="bold" style={styles.sheetText}>
              Read
            </Text>
            <ReadIcon />
          </Pressable>
        </View>
      </View>
    );
  };

  const renderPdfFiles: ListRenderItem<IPDFBook> = ({item}) => {
    return (
      <Pressable
        style={styles.pdfContainer}
        onPress={() => handleDocPress(item)}>
        <Image
          // source={item.thumbnail}
          source={require('../../assets/images/thumbnail.png')}
          style={styles.thumbnailImage}
          resizeMode="contain"
        />
        <Text numberOfLines={1} style={styles.pdfTitle}>
          {item.title.split('.pdf')}
        </Text>
        <View style={styles.progressBar} />
      </Pressable>
    );
  };

  if (!books.length && !IsProcessing()) {
    return (
      <View style={styles.noBooks}>
        <SpeachText
          text={EmptyDirectoryText}
          active={isSpeachActive}
          style={styles.emptyDir}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {books.length || IsProcessing() ? (
        <View>
          <Text style={styles.heading}> Recently added </Text>
          <FlatList
            data={IsProcessing() ? DummyBooks : books}
            horizontal
            renderItem={renderPdfFiles}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.pdfContent}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}

      <BottomSheet onDismiss={onDismiss} isVisible={openModal}>
        <BottomSheetContent />
      </BottomSheet>
    </View>
  );
};

export default UploadedPDFs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noBooks: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyDir: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  inputContainer: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  pdfView: {
    backgroundColor: 'red',
  },
  thumbnailImage: {
    width: pdfWidth,
    height: pdfHeight,
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    alignSelf: 'center',
  },

  bottomSheetThumbnail: {
    height: 150,
    width: pdfWidth,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  sheetButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  sheetText: {
    marginRight: 7,
  },
  sheetButton: {
    backgroundColor: appcolors.grey,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 120,
    justifyContent: 'center',
  },
  pdfContainer: {
    marginRight: 20,
    alignItems: 'center',
    width: pdfWidth,
    shadowColor: appcolors.primary,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  pdfContent: {
    // paddingHorizontal: 10,
  },
  pdfTitle: {
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  progressBar: {
    backgroundColor: appcolors.primary,
    borderRadius: 10,
    width: '100%',
    height: 2,
    marginTop: 6,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
});
