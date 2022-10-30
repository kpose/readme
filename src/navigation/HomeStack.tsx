import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IHomeStackParamList} from './interfaces';
import ListenScreen from '../screens/ListenScreen/ListenScreen';
import AppBottomTabs from './AppBottomTabs';

const Stack = createNativeStackNavigator<IHomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={AppBottomTabs} />
      <Stack.Screen name="ListenScreen" component={ListenScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
