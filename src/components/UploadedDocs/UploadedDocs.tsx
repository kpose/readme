import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../Text/Text';

import {useAppSelector} from '../../hooks/ReduxState.hook';

const UploadedDocs = () => {
  const books = useAppSelector(state => state.books.books);
  const {height, width} = useWindowDimensions();
  const ItemSeparatorView = () => {
    return <View style={styles.inputContainer} />;
  };

  useEffect(() => {
    console.log(books);
  }, [books]);

  const renderPdfView = ({item}) => (
    <View>
      <Text>{item.thumbnail.width}</Text>
      <Image
        source={item.thumbnail}
        resizeMode="contain"
        style={styles.thumbnailImage}
      />
    </View>
  );

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
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderPdfView}
          keyExtractor={(item, index) => index.toString()}
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
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

{
  /* <Text onPress={() => getAndWritePdf(item.fullPath, item.name)}>
  File Name: {item.name}
  {'\n'}
  File Full Path: {item.fullPath}
  {'\n'}
  Bucket: {item.bucket}
</Text>; */
}
