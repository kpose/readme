import {
  View,
  FlatList,
  StyleSheet,
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
import FastImage, {OnProgressEvent} from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getUniqueID} from '../../utils/Helpers.util';
import UpdatingLibraryView from '../../components/UpdatingLibraryView/UpdatingLibraryView';
// import {usePDFViewer} from '../../providers/PDFViewerProvider';

const PDFWIDTH = Dimensions.get('window').width / 3 - 10;
const PDFHEIGHT = Dimensions.get('window').height / 6 - 10;
const EmptyDirectoryText =
  'Your library looks empty, click the button below to add your first document.';

const UploadedPDFs = () => {
  const books = useAppSelector((state: RootState) => state.books);
  const [openModal, setopenModal] = useState<boolean>(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(true);
  const [openDoc, setOpenDoc] = useState<IOpenDocProps>();
  const navigation = useNavigation();
  const [isSpeachActive, setIsSpeachActive] = useState(false);
  const {startSpeach} = useSpeach();
  const {isUploadingPDF, deletePDF, isFetchingPDF, isDeletingPDF} =
    useFileUpload();

  const dummy = {
    title: 'Processing ...',
    id: getUniqueID(5),
    url: 'https://google.com',
    bookData: [],
    listening: {currentPage: 0},
  };
  const DummyBooks = [dummy, ...books];

  useEffect(() => {
    // console.log(books);
  }, [books]);

  useEffect(() => {
    /* read the **no pdf** welcome if user has no uploaded docs */
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
    return isUploadingPDF || isFetchingPDF;
  }, [isFetchingPDF, isUploadingPDF]);

  const handleDocPress = useCallback(
    (doc: IPDFBook) => {
      if (openModal || IsProcessing()) {
        return;
      }
      // open book's details bottom sheet
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
    if (isDeletingPDF || !openDoc) {
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
          deletePDF(openDoc.id);
          setopenModal(false);
        },
      },
    ]);
  }, [deletePDF, isDeletingPDF, openDoc]);

  const shouldShowProgress = useCallback(
    (index: number) => {
      return index === 0 && loadingPercent >= 1 && loadingPercent <= 99;
    },
    [loadingPercent],
  );

  // const handleImageLoadProgress = useCallback((e: OnProgressEvent) => {
  //   if (!e.nativeEvent) {
  //     return;
  //   }
  //   let percentage = Number(e.nativeEvent.loaded / e.nativeEvent.total) * 100;
  //   console.log(percentage);
  //   setLoadingPercent(Math.round(percentage));
  // }, []);

  const BottomSheetContent = () => {
    return (
      <View>
        {isDeletingPDF ? (
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
            {opacity: isDeletingPDF ? 0.5 : 1},
          ]}
          resizeMode="contain"
        />
        <Text
          weight="bold"
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.title, {opacity: isDeletingPDF ? 0.5 : 1}]}>
          Title: {openDoc?.title.split('.pdf')}
        </Text>

        <View
          style={[
            styles.sheetButtonsContainer,
            // eslint-disable-next-line react-native/no-inline-styles
            {opacity: isDeletingPDF ? 0.5 : 1},
          ]}>
          {/* Listen button */}
          <TouchableOpacity style={styles.sheetButton} onPress={onListenPress}>
            <Text weight="bold" style={styles.sheetText}>
              Listen
            </Text>
            <ListenIcon />
          </TouchableOpacity>

          {/* Read button */}
          <TouchableOpacity style={styles.sheetButton} onPress={onReadPress}>
            <Text weight="bold" style={styles.sheetText}>
              Read
            </Text>
            <ReadIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onDeletePress}>
          <Text weight="bold" style={styles.delete}>
            Delete
          </Text>
        </TouchableOpacity>
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
        {shouldShowProgress(index) ? (
          <TouchableOpacity onPress={() => handleDocPress(item)}>
            <Text>Loading ... {loadingPercent}</Text>
          </TouchableOpacity>
        ) : (
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
              onProgress={e => {
                if (Number(e.nativeEvent.total) < 5) {
                  return setLoadingPercent(0);
                }
                let percentage =
                  Number(e.nativeEvent.loaded / e.nativeEvent.total) * 100;
                console.log(e.nativeEvent.loaded, 'loaded');
                console.log(e.nativeEvent.total, 'total');
                console.log(percentage, 'percentage');
                setLoadingPercent(Math.round(percentage));
              }}
            />
          </TouchableOpacity>
        )}
        {IsProcessing() && index === 0 ? <Text>Processing...</Text> : null}
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
      {!books.length && IsProcessing() ? (
        <UpdatingLibraryView isVisible={true} />
      ) : null}

      {books.length ? (
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
    height: PDFHEIGHT - 15,
    width: PDFWIDTH,
    alignSelf: 'center',
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
