import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './providers/ThemeProvider';
import {SpeachProvider} from './providers/SpeachProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PDFViewerProvider} from './providers/PDFViewerProvider';
import {UserProvider} from './providers/UserProvider';

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <SpeachProvider>
              <PDFViewerProvider>
                <RootNavigator />
              </PDFViewerProvider>
            </SpeachProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
