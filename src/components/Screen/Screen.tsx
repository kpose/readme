import {StyleSheet, StatusBar} from 'react-native';
import React, {FC} from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
}

const Screen: FC<ScreenProps> = ({children, showStatusBar}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={showStatusBar} />
      {children}
    </SafeAreaView>
  );
};

Screen.defaultProps = {
  showStatusBar: true,
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 20,
  },
});
