import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {DarkTheme, LightTheme} from '../utils/colors.util';
import {useTheme} from '../providers/ThemeProvider';

export default function RootNavigator() {
  const {isDarkTheme} = useTheme();
  console.log(isDarkTheme);
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      <AuthStack />
    </NavigationContainer>
  );
}
