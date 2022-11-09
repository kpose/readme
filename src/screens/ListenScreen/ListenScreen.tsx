import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
  Pressable,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {IListenScreenProps} from './interfaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '../../components/Text/Text';
import SpeachText from '../../components/Text/SpeachText';

import {useAppDispatch, useAppSelector} from '../../hooks/ReduxState.hook';
import {RootState} from '../../redux/store';
import {
  IPDFBook,
  IPDFBookData,
  updateListening,
} from '../../redux/slices/uploadedBooksSlice';
import BottomControlPanel from '../../components/BottomControlPanel/BottomControlPanel';
import {appcolors} from '../../utils/colors.util';
import {ISpeachVoice, useSpeach} from '../../providers/SpeachProvider';
import {CloseIcon} from '../../components/Icon/Icon';
import {useTheme} from '../../providers/ThemeProvider';

const ListenScreen = ({navigation, route}: IListenScreenProps) => {
  const books = useAppSelector((state: RootState) => state.books);
  const [doc, setDoc] = useState<IPDFBook>();
  const [isReadingChapter, setIsReadingChapter] = useState(false);
  const [isVoiceModalVisible, setIsVoiceModalVisible] = useState(true);
  const {height, width} = useWindowDimensions();
  const {isDarkTheme} = useTheme();
  const VOICE_MODAL_HEIGHT = 300;
  const VOICE_MODAL_WIDTH = width / 1.2;

  const {
    startSpeach,
    isReading,
    isFinishedReading,
    pauseSpeach,
    isPaused,
    speachVoices,
  } = useSpeach();
  const flatListRef = useRef<FlatList>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!books.length) {
      return;
    }
    setIsReadingChapter(true);
    const book = books.find(x => x.title === route.params.title);

    setDoc(book);

    setTimeout(() => {
      if (flatListRef.current && book?.listening.currentPage) {
        let currentPage = book.listening.currentPage;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: currentPage,
        });
      }
    }, 500);
  }, [books, route.params.title]);

  /* Speach Control; play */
  const onPlayPress = useCallback(() => {
    if (!doc) {
      return;
    }
    const book = doc.bookData;
    const curretPage = doc.listening.currentPage;

    startSpeach(book[curretPage].text);
  }, [doc, startSpeach]);

  /* pause listening */
  const onPausePress = useCallback(() => {
    pauseSpeach();
  }, [pauseSpeach]);

  /* Speaking voice */
  const onSpeakerPress = useCallback(() => {
    if (speachVoices && speachVoices.length > 0) {
      if (isVoiceModalVisible) {
        setIsVoiceModalVisible(false);
        return;
      }
      pauseSpeach();
      setIsVoiceModalVisible(true);
      return;
    }
    return Alert.alert(
      'Your device does not support you changing the current voice',
    );
  }, [isVoiceModalVisible, pauseSpeach, speachVoices]);

  const closeDoc = () => {
    if (isReading) {
      pauseSpeach();
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (isReading || isPaused) {
      return;
    }

    if (isFinishedReading) {
      if (!books.length) {
        return;
      }
      const book = books.find(x => x.title === route.params.title);
      if (!book) {
        return;
      }
      let currentPage = book.listening.currentPage;
      startSpeach(book.bookData[currentPage + 1].text);

      dispatch(
        updateListening({
          id: book.id,
          currentPage: currentPage + 1,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinishedReading]);

  const keyExtractor = _ => `${_._id}`;

  const itemSeperator = () => {
    return <View style={styles.itemSeperator} />;
  };

  const VoicesitemSeperator = () => {
    return (
      <View style={[styles.voicesItemSeperator, {width: VOICE_MODAL_WIDTH}]} />
    );
  };

  const renderDocContent: ListRenderItem<IPDFBookData> = ({item}) => {
    return (
      <View
        style={[
          styles.docContentContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            height: height,
            opacity: isVoiceModalVisible ? 0.5 : 1 /* width: width */,
          },
        ]}>
        <Text weight="bold" style={styles.pageNumber}>
          {'Page: '}
          {item.pageNumber}
        </Text>
        <SpeachText text={item.text} active={isReadingChapter} />
      </View>
    );
  };

  const VoicesModalContent: ListRenderItem<ISpeachVoice> = ({item}) => {
    return (
      <TouchableOpacity onPress={() => console.log(item.language)}>
        <View style={styles.voicesModalContentContainer}>
          <Text weight="bold">{item.name}</Text>
          <Text>{`Language:  ${item.language}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* reader chapters*/}
      <View style={styles.readerContainer}>
        {/* close button/text */}
        <View style={styles.header}>
          <Pressable onPress={closeDoc}>
            <CloseIcon size={30} />
          </Pressable>
          <Text weight="bold" style={styles.title}>
            {doc?.title.split('.pdf')}
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={doc?.bookData}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={renderDocContent}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeperator}
          getItemLayout={(data, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVoiceModalVisible}>
          <View style={styles.voicesModalContainer}>
            <View
              style={[
                styles.voicesContainer,
                {
                  backgroundColor: isDarkTheme
                    ? appcolors.darkGrey
                    : appcolors.lightGrey,
                  width: VOICE_MODAL_WIDTH,
                  height: VOICE_MODAL_HEIGHT,
                },
              ]}>
              <View style={styles.voiceModalHead}>
                <Pressable onPress={() => setIsVoiceModalVisible(false)}>
                  <CloseIcon />
                </Pressable>
                <Text weight="bold" style={[styles.voicesModalHeader]}>
                  Select Preferred Voice
                </Text>
              </View>
              <FlatList
                data={speachVoices}
                showsVerticalScrollIndicator={false}
                renderItem={VoicesModalContent}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={VoicesitemSeperator}
              />
            </View>
          </View>
        </Modal>
      </View>

      <BottomControlPanel
        onPlayPress={onPlayPress}
        onPausePress={onPausePress}
        onSpeakerPress={onSpeakerPress}
      />
    </SafeAreaView>
  );
};

export default ListenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  docContentContainer: {
    // flex: 1,
  },
  voicesModalContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 5,
  },
  voicesModalHeader: {
    alignSelf: 'center',
    marginVertical: 10,
    color: appcolors.primary,
  },
  voicesItemSeperator: {
    height: 0.4,
    backgroundColor: appcolors.secondary,
    borderWidth: 0.7,
    borderStyle: 'dotted',
  },
  voiceModalHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  pageNumber: {
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  itemSeperator: {
    backgroundColor: appcolors.secondary,
    height: 1,
    borderRadius: 10,
    marginVertical: 30,
  },
  closeButton: {
    marginBottom: 10,
  },
  voicesModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  voicesContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  readerContainer: {
    marginTop: 10,
    marginHorizontal: 7,
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
  },
});
