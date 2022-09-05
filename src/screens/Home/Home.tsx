import {StyleSheet, Text, Alert} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen/Screen';
import {IAppStackParamList} from '../../navigation/interfaces';
import FAB from '../../components/FAB/FAB';

const Home = () => {
  return (
    <Screen>
      <Text>Home</Text>
      <FAB />
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
