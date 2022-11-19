import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  ListRenderItem,
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text, {ScreenTitle} from '../../components/Text/Text';
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
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {usePDFViewer} from '../../providers/PDFViewerProvider';

const PDFWIDTH = Dimensions.get('window').width / 3 - 10;
const PDFHEIGHT = Dimensions.get('window').height / 6 - 10;
const EmptyDirectoryText =
  'Your library looks empty, click the button below to add your first document.';

const UploadedPDFs = () => {
  const books = useAppSelector((state: RootState) => state.books);
  const [openModal, setopenModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDoc, setOpenDoc] = useState<IOpenDocProps>();
  const navigation = useNavigation();
  const [isSpeachActive, setIsSpeachActive] = useState(false);
  const {startSpeach} = useSpeach();
  const {isUploadingPDF, deletePDF, isFetchingBooks} = useFileUpload();

  const dummy = {
    title: 'Processing ...',
    id: '20',
    url: 'https://readmeapp.com',
    bookData: [],
    listening: {currentPage: 0},
  };
  const DummyBooks = [dummy, ...books];

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
    return isUploadingPDF || isFetchingBooks;
  }, [isFetchingBooks, isUploadingPDF]);

  const handleDocPress = useCallback(
    (doc: IPDFBook) => {
      if (openModal || IsProcessing()) {
        return;
      }
      // set bottom sheet details
      setOpenDoc({
        title: doc.title,
        id: doc.id,
        thumbnail: doc.thumbnailFileUrl,
      });
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

  const onDeletePress = useCallback(() => {
    if (isDeleting || !openDoc) {
      return;
    }
    Alert.alert('Attention', 'Are you sure you want to delete this document?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        onPress: () => {
          setIsDeleting(true);
          deletePDF(openDoc.id);
          setopenModal(false);
        },
      },
    ]);
  }, [deletePDF, isDeleting, openDoc]);

  const BottomSheetContent = () => {
    return (
      <View>
        {isDeleting ? (
          <View style={styles.bottomSheetSpinerContainer}>
            <ActivityIndicator size="large" color={appcolors.primary} />
          </View>
        ) : null}
        <FastImage
          source={{
            uri: openDoc?.thumbnail,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          style={[
            styles.bottomSheetThumbnail,
            // eslint-disable-next-line react-native/no-inline-styles
            {opacity: isDeleting ? 0.5 : 1},
          ]}
          resizeMode="contain"
        />
        <Text
          weight="bold"
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.title, {opacity: isDeleting ? 0.5 : 1}]}>
          Title: {openDoc?.title.split('.pdf')}
        </Text>

        <View
          style={[
            styles.sheetButtonsContainer,
            // eslint-disable-next-line react-native/no-inline-styles
            {opacity: isDeleting ? 0.5 : 1},
          ]}>
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

        <Pressable onPress={onDeletePress}>
          <Text weight="bold" style={styles.delete}>
            Delete
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderPdfFiles: ListRenderItem<IPDFBook> = ({item, index}) => {
    return (
      <View
        style={[
          styles.pdfContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {opacity: IsProcessing() && index === 0 ? 0.4 : 1},
        ]}>
        <TouchableOpacity onPress={() => handleDocPress(item)}>
          <FastImage
            source={
              IsProcessing() && index === 0
                ? require('../../assets/images/thumbnail.png')
                : {
                    uri: item.thumbnailFileUrl,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable,
                  }
            }
            style={[styles.thumbnailImage]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
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
          <ScreenTitle> Library </ScreenTitle>
          <FlatList
            data={IsProcessing() ? DummyBooks : books}
            numColumns={3}
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
  bottomSheetSpinerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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

  title: {
    alignSelf: 'center',
  },
  delete: {
    alignSelf: 'center',
    color: appcolors.error,
    marginTop: 5,
  },

  bottomSheetThumbnail: {
    height: 150,
    width: PDFWIDTH,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  sheetButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
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
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    maxWidth: PDFWIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: appcolors.secondary,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  thumbnailImage: {
    width: PDFWIDTH,
    height: PDFHEIGHT - 15,
    overflow: 'hidden',
  },
  pdfContent: {
    // paddingHorizontal: 10,
  },
  pdfTitle: {
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 7,
  },
  progressBar: {
    backgroundColor: appcolors.primary,
    borderRadius: 10,
    width: '100%',
    height: 2,
    marginTop: 7,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
  },
});
