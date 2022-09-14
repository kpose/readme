import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../Text/Text';
import {RootState} from '../../redux/store';
const pdfWidth = 120;
const pdfHeight = 190;

import {useAppSelector} from '../../hooks/ReduxState.hook';
import {appcolors} from '../../utils/colors.util';

const UploadedDocs = () => {
  const books = useAppSelector((state: RootState) => state.books);
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    console.log(books);
  }, [books]);

  const renderPdfView = ({item}) => {
    return (
      <View style={styles.pdfContainer}>
        <Image
          source={item.thumbnail}
          style={styles.thumbnailImage}
          resizeMode="contain"
        />
        <Text style={styles.pdfTitle}>{item.name.split('.pdf')}</Text>
      </View>
    );
  };
  if (!books) {
    return (
      <View>
        <Text>Loading books</Text>
      </View>
    );
  }

  return (
    <View>
      {books.length ? (
        <FlatList
          data={books}
          horizontal
          renderItem={renderPdfView}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.pdfContent}
        />
      ) : null}
    </View>
  );
};

export default UploadedDocs;

const styles = StyleSheet.create({
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
  pdfContainer: {
    marginRight: 10,
    alignItems: 'center',
    width: pdfWidth,
  },
  pdfContent: {
    // paddingHorizontal: 10,
  },
  pdfTitle: {
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});
