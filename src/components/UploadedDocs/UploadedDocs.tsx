import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Text from '../Text/Text';

import {useAppSelector} from '../../hooks/ReduxState.hook';

const UploadedDocs = () => {
  const books = useAppSelector(state => state.books.books);

  const ItemSeparatorView = () => {
    return <View style={styles.inputContainer} />;
  };

  const ItemView = ({item}) => (
    <View style={styles.itemView}>
      <Text /* onPress={() => getAndWritePdf(item.fullPath, item.name)} */>
        File Name: {item.name}
        {'\n'}
        File Full Path: {item.fullPath}
        {'\n'}
        Bucket: {item.bucket}
      </Text>
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
          renderItem={ItemView}
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
  itemView: {
    // padding: 10,
  },
});
