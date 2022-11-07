import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
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

const ListenScreen = ({navigation, route}: IListenScreenProps) => {
  const books = useAppSelector((state: RootState) => state.books);
  const [doc, setDoc] = useState<IPDFBook>();
  const [isReadingChapter, setIsReadingChapter] = useState(false);
  const ITEM_HEIGHT = 65;
  const {height} = useWindowDimensions();
  const {startSpeach, isReading, isFinishedReading} = useSpeach();
  const flatListRef = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!books.length) {
      return;
    }
    setIsReadingChapter(true);
    const book = books.find(x => x.title === route.params.title);
    setDoc(book);
  }, [books, route.params.title]);

  /* Speach Controls */
  const onPlayPress = useCallback(
    (page?: number) => {
      if (!doc) {
        return;
      }
      const book = doc.bookData;
      const curretPage = doc.listening.currentPage;

      let pageNumber = page || curretPage;

      startSpeach(book[pageNumber].text);
    },
    [doc, startSpeach],
  );

  useEffect(() => {
    if (isReading) {
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

  /* Flatlist components */
  const keyExtractor = _ => `${_._id}`;
  const getItemLayout = (data, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * data.length,
      index,
    };
  };
  const itemSeperator = () => {
    return <View style={styles.itemSeperator} />;
  };
  const renderDocContent: ListRenderItem<IPDFBookData> = ({item}) => {
    return (
      <View style={[styles.docContentContainer, {height: height / 1.3}]}>
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
        <ScreenTitle style={styles.title}>
          {doc?.title.split('.pdf')}
        </ScreenTitle>

        <FlatList
          ref={flatListRef}
          data={doc?.bookData}
          renderItem={renderDocContent}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          ItemSeparatorComponent={itemSeperator}
        />
      </View>

      <BottomControlPanel onPlayPress={onPlayPress} />
    </SafeAreaView>
  );
};

export default ListenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  docContentContainer: {
    flex: 1,
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

  readerContainer: {
    marginTop: 10,
    marginHorizontal: 7,
  },
  title: {
    alignSelf: 'center',
  },
});
