import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import React from 'react';
import {appcolors} from '../../utils/colors.util';
import {
  CameraIcon,
  CloudIcon,
  FolderIcon,
  LinkIcon,
  PasteTextIcon,
} from '../Icon/Icon';
import Text from '../Text/Text';

const POPUP_OPTIONS = [
  'New Folder',
  'Scan Pages',
  'Paste Text',
  'Import Files',
  'Paste Web Link',
];

const getPopupIcon = (index: number) => {
  switch (index) {
    case 0:
      return <FolderIcon size={20} />;
    case 1:
      return <CameraIcon size={20} />;
    case 2:
      return <PasteTextIcon size={20} />;
    case 3:
      return <CloudIcon size={20} />;
    case 4:
      return <LinkIcon size={20} />;
    default:
      return <FolderIcon size={20} />;
  }
};

const FABpopup = () => {
  const renderItems = ({index, item}: any) => {
    return (
      <Pressable style={styles.popupItem}>
        {getPopupIcon(index)}
        <Text weight="bold" style={styles.popupText}>
          {item}
        </Text>
      </Pressable>
    );
  };

  const renderSeperator = x => {
    return (
      <View>
        <Text>{'yyy'}</Text>
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
        // ItemSeparatorComponent={renderSeperator}
      />
    </View>
  );
};

export default FABpopup;

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: appcolors.grey,
    borderRadius: 10,
    paddingVertical: 5,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  popupText: {
    marginHorizontal: 10,
  },
});
