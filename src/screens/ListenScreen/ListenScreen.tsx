import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {IListenScreenProps} from './interfaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text, {ScreenTitle} from '../../components/Text/Text';
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
import {useSpeach} from '../../providers/SpeachProvider';
import {CloseIcon} from '../../components/Icon/Icon';

const ListenScreen = ({navigation, route}: IListenScreenProps) => {
  const books = useAppSelector((state: RootState) => state.books);
  const [doc, setDoc] = useState<IPDFBook>();
  const [isReadingChapter, setIsReadingChapter] = useState(false);
  const {height} = useWindowDimensions();
  const {startSpeach, isReading, isFinishedReading, pauseSpeach, isPaused} =
    useSpeach();
  const flatListRef = useRef<FlatList>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!books.length) {
      return;
    }
    setIsReadingChapter(true);
    const book = books.find(x => x.title === route.params.title);

    setDoc(book);

    if (flatListRef.current && book?.listening.currentPage) {
      let currentPage = book?.listening.currentPage;
      setTimeout(
        () =>
          flatListRef.current.scrollToIndex({
            animated: true,
            index: currentPage,
          }),
        500,
      );
    }
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

  const renderDocContent: ListRenderItem<IPDFBookData> = ({item}) => {
    return (
      <View
        style={[
          styles.docContentContainer,
          {height: height /* width: width */},
        ]}>
        <Text weight="bold" style={styles.pageNumber}>
          {'Page: '}
          {item.pageNumber}
        </Text>
        <SpeachText text={item.text} active={isReadingChapter} />
      </View>
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
      </View>

      <BottomControlPanel
        onPlayPress={onPlayPress}
        onPausePress={onPausePress}
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

  readerContainer: {
    marginTop: 10,
    marginHorizontal: 7,
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
  },
});
