import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './providers/ThemeProvider';
import {SpeachProvider} from './providers/SpeachProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SpeachProvider>
          <RootNavigator />
        </SpeachProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
