import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstName from '../screens/FirstName/FirstName';
import {IAuthStackParamList} from './interfaces';
import AppStack from './AppStack';
// import Onboarding from '../screens/Onboarding/Onboarding';

const Stack = createNativeStackNavigator<IAuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Onboarding" component={Onboarding} /> */}
      <Stack.Screen name="FirstName" component={FirstName} />

      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
}

export default AuthStack;
