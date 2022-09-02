import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './providers/ThemeProvider';
import {SpeachProvider} from './providers/SpeachProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <SpeachProvider>
            <RootNavigator />
          </SpeachProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
