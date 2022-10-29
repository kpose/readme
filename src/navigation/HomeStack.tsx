import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IHomeStackParamList} from './interfaces';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator<IHomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
