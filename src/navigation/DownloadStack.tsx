import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IDownloadStackParamList} from './interfaces';
import DownloadScreen from '../screens/DownloadScreen/DownloadScreen';

const Stack = createNativeStackNavigator<IDownloadStackParamList>();

function DownloadStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
    </Stack.Navigator>
  );
}

export default DownloadStack;
