import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IAppStackParamList} from './interfaces';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator<IAppStackParamList>();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default AppStack;
