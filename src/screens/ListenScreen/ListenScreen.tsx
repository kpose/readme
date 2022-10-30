import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IListenScreenProps} from './interfaces';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '../../components/Text/Text';
import {useAppSelector} from '../../hooks/ReduxState.hook';
import {RootState} from '../../redux/store';
import {IPDFBook} from '../../redux/slices/uploadedBooksSlice';
import BottomControlPanel from '../../components/BottomControlPanel/BottomControlPanel';

const ListenScreen = ({navigation, route}: IListenScreenProps) => {
  const books = useAppSelector((state: RootState) => state.books);
  const [doc, setDoc] = useState<IPDFBook>();

  useEffect(() => {
    if (!books.length) {
      return;
    }
    const book = books.find(x => x.title === route.params.title);
    setDoc(book);
  }, [books, route.params.title]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{doc?.title}</Text>
      <BottomControlPanel />
    </SafeAreaView>
  );
};

export default ListenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
