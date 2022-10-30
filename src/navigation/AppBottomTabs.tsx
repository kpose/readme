import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IAppStackBottomTabList} from './interfaces';
import {HomeIcon, UserIcon} from '../components/Icon/Icon';
import {appcolors} from '../utils/colors.util';
import ProfileStack from './ProfileStack';
import HomeScreen from '../screens/HomeStack/HomeStack';

const Tab = createBottomTabNavigator<IAppStackBottomTabList>();

function AppBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        title: '',
        headerShown: false,
        tabBarIconStyle: {
          marginTop: 20,
        },
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon size={size} color={color} />;
            case 'ProfileStack':
              return <UserIcon size={size} color={color} />;
            default:
              break;
          }
        },
        tabBarActiveTintColor: appcolors.primary,
        tabBarInactiveTintColor: appcolors.grey,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default AppBottomTabs;
