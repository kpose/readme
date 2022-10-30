import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BottomControlPanel = () => {
  return (
    <View style={styles.container}>
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
    height: 200,
    backgroundColor: 'red',
  },
});
