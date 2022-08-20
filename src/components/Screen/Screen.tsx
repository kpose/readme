import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
}

const Screen: FC<ScreenProps> = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 20,
  },
});
