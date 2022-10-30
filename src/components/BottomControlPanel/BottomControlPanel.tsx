import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../providers/ThemeProvider';
import {appcolors} from '../../utils/colors.util';

const BottomControlPanel = () => {
  const {isDarkTheme} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? appcolors.darkGrey
            : appcolors.lightGrey,
        },
      ]}>
      <Text>BottomControlPanel</Text>
    </View>
  );
};

export default BottomControlPanel;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});
