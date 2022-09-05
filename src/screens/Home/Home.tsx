import {Text} from 'react-native';
import React from 'react';
import Screen from '../../components/Screen/Screen';
import FAB from '../../components/FAB/FAB';
import {FolderIcon} from '../../components/Icon/Icon';

const Home = () => {
  return (
    <Screen>
      <Text>Home</Text>
      <FolderIcon size={15} />
      <FAB />
    </Screen>
  );
};

export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
