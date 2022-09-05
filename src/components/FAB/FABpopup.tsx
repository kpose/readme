import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {appcolors} from '../../utils/colors.util';

const POPUP_OPTIONS = [
  'New Folder',
  'Scan Pages',
  'Paste Text',
  'Import Files',
  'Paste Web Link',
];

const FABpopup = () => {
  const renderItems = ({index, item}: any) => {
    return (
      <View style={styles.popupItem}>
        <Text>{item}</Text>
      </View>
    );
  };
  return (
    <View style={styles.popupContainer}>
      <FlatList
        data={POPUP_OPTIONS}
        renderItem={renderItems}
        keyExtractor={x => {
          return x;
        }}
      />
    </View>
  );
};

export default FABpopup;

const styles = StyleSheet.create({
  popupContainer: {
    // backgroundColor: appcolors.grey,
  },
  popupItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
