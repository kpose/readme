import {StyleSheet} from 'react-native';
import React from 'react';
import Text from '../../components/Text/Text';
import Screen from '../../components/Screen/Screen';

const ProfileScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text>ProfileScreen</Text>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
