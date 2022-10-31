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

import {useAppSelector} from '../../hooks/ReduxState.hook';
import {RootState} from '../../redux/store';
import {IPDFBook, IPDFBookData} from '../../redux/slices/uploadedBooksSlice';
import BottomControlPanel from '../../components/BottomControlPanel/BottomControlPanel';
import {appcolors} from '../../utils/colors.util';
import {useSpeach} from '../../providers/SpeachProvider';

const ListenScreen = ({navigation, route}: IListenScreenProps) => {
  const books = useAppSelector((state: RootState) => state.books);
  const [doc, setDoc] = useState<IPDFBook>();
  const ITEM_HEIGHT = 65; // fixed height of item component
  const {height} = useWindowDimensions();
  const {startSpeach} = useSpeach();
  //   const messageRef = useRef<IPDFBookData>();

  useEffect(() => {
    if (!books.length) {
      return;
    }
    const book = books.find(x => x.title === route.params.title);
    setDoc(book);
  }, [books, route.params.title]);

  //   useEffect(() => {
  //     if (!doc) {
  //       return;
  //     }
  //     const book = doc;
  //     messageRef.current = book.bookData;
  //   }, [doc]);

  /* Speach Controls */
  const onPlayPress = useCallback(() => {
    if (!doc) {
      return;
    }
    // check here if user already started
    // reading, then start from last word location

    const book = doc.bookData;
    startSpeach(book[2].text);
    // book.forEach((page, index) => {
    //   setTimeout(() => {
    //     startSpeach(page.text);
    //   }, index * 1000);
    // });
  }, [doc, startSpeach]);

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
        <SpeachText text={item.text} />
        {/* <SpeachText style={styles.textContent}>{item.text}  /></SpeachText> */}
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
