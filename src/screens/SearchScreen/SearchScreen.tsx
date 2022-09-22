import {StyleSheet} from 'react-native';
import React from 'react';
import Text from '../../components/Text/Text';
import Screen from '../../components/Screen/Screen';

const SearchScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text>SearchScreen</Text>
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
