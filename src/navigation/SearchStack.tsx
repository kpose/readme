import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ISearchStackParamList} from './interfaces';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator<ISearchStackParamList>();

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default SearchStack;
