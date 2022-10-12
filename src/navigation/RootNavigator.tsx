import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {DarkTheme, LightTheme} from '../utils/colors.util';
import {useTheme} from '../providers/ThemeProvider';
import AppBottomTabs from './AppBottomTabs';
import {asyncGet} from '../utils/Async.util';
import {STORE_KEYS} from '../utils/Keys.util';

export default function RootNavigator() {
  const {isDarkTheme} = useTheme();
  // const [hasToken, setHasToken] = React.useState(false);

  // const getAuthToken = React.useCallback(async () => {
  //   const token = await asyncGet(STORE_KEYS.AUTH_TOKEN);
  //   if (token) {
  //     setHasToken(true);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   getAuthToken();
  // }, [getAuthToken]);

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      {/* {hasToken ? <AppBottomTabs /> : <AuthStack />} */}
      <AuthStack />
    </NavigationContainer>
  );
}
