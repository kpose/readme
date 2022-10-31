import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {IListenScreenProps} from './interfaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text, {ScreenTitle} from '../../components/Text/Text';

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

  useEffect(() => {
    if (!books.length) {
      return;
    }
    const book = books.find(x => x.title === route.params.title);
    setDoc(book);
  }, [books, route.params.title]);

  const onPlayPress = useCallback(() => {
    setTimeout(() => startSpeach('hello, we are speaking'), 500);
  }, [startSpeach]);

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
        <Text style={styles.textContent}>{item.text}</Text>
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
  textContent: {
    lineHeight: 30,

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
  },

  readerContainer: {
    marginTop: 10,
    marginHorizontal: 7,
  },
  title: {
    alignSelf: 'center',
  },
});
