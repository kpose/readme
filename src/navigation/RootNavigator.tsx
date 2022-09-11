import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {DarkTheme, LightTheme} from '../utils/colors.util';
import {useTheme} from '../providers/ThemeProvider';
import AppStack from './AppStack';
import {useUser} from '../providers/UserProvider';

export default function RootNavigator() {
  const {isDarkTheme} = useTheme();
  const {user} = useUser();
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
