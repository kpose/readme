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

interface IPopupProps {
  onPress: (x: number) => void;
}

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

const FABpopup = ({onPress}: IPopupProps) => {
  const renderItems = ({index, item}: any) => {
    return (
      <>
        <Pressable style={styles.popupItem} onPress={() => onPress(index)}>
          {getPopupIcon(index)}
          <Text weight="bold" style={styles.popupText}>
            {item}
          </Text>
        </Pressable>
        {index === 0 ? (
          <View style={styles.topSeperator} />
        ) : index < 4 ? (
          <View style={styles.bottomSeperator} />
        ) : null}
      </>
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
    backgroundColor: appcolors.grey,
    borderRadius: 10,
    paddingVertical: 5,
  },
  topSeperator: {
    height: 4,
    backgroundColor: '#adadad',
    borderRadius: 10,
  },
  bottomSeperator: {
    height: 2,
    backgroundColor: '#adadad',
    borderRadius: 10,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  popupText: {
    marginHorizontal: 10,
    marginRight: 30,
  },
});
