import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstName from '../screens/FirstName/FirstName';
import {IAuthStackParamList} from './interfaces';

const Stack = createNativeStackNavigator<IAuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstName" component={FirstName} />
    </Stack.Navigator>
  );
}

export default AuthStack;
