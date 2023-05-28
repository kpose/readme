import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '../Text/Text';
import {appcolors} from '../../utils/colors.util';

const UpdatingLibraryView = () => {
  return (
    <View style={styles.updatingViewContainer}>
      <Text weight="bold" style={styles.updatingText}>
        Updating Library
      </Text>
      <ActivityIndicator
        color={appcolors.primary}
        size={'small'}
        animating={true}
      />
    </View>
  );
};

export default UpdatingLibraryView;

const styles = StyleSheet.create({
  updatingViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 500,
  },
  updatingText: {
    marginRight: 7,
    color: appcolors.primary,
    fontSize: 15,
  },
});
