import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './providers/ThemeProvider';
import {SpeachProvider} from './providers/SpeachProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PDFViewerProvider} from './providers/PDFViewerProvider';
import {UserProvider} from './providers/UserProvider';
import {Provider as ReduxProvider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;
