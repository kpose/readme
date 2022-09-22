import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IAuthStackParamList} from './interfaces';
import Onboarding from '../screens/Onboarding/Onboarding';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import AppBottomTabs from './AppBottomTabs';

const Stack = createNativeStackNavigator<IAuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="AppBottomTabs" component={AppBottomTabs} />
    </Stack.Navigator>
  );
}

export default AuthStack;
