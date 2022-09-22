import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {DarkTheme, LightTheme} from '../utils/colors.util';
import {useTheme} from '../providers/ThemeProvider';
import {useUser} from '../providers/UserProvider';
import AppBottomTabs from './AppBottomTabs';

export default function RootNavigator() {
  const {isDarkTheme} = useTheme();
  const {user} = useUser();
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      {user ? <AppBottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
