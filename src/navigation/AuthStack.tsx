import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import FirstName from '../screens/FirstName/FirstName';
import {IAuthStackParamList} from './interfaces';
import AppStack from './AppStack';
import Onboarding from '../screens/Onboarding/Onboarding';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

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
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
}

export default AuthStack;
