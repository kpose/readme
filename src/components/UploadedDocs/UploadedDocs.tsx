import {View, FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import Text from '../Text/Text';

import {useAppSelector} from '../../hooks/ReduxState.hook';

const UploadedDocs = () => {
  const books = useAppSelector(state => state.books.books);
  const {height, width} = useWindowDimensions();
  const ItemSeparatorView = () => {
    return <View style={styles.inputContainer} />;
  };

  const renderPdfView = ({item}) => (
    <View style={[styles.pdfView, {height: height / 3, width: width / 3}]}>
      <Text>hhhh</Text>
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
