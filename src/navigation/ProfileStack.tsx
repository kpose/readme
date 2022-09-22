import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IProfileStackParamList} from './interfaces';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Stack = createNativeStackNavigator<IProfileStackParamList>();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
