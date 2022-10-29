import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IAppStackBottomTabList} from './interfaces';
import {HomeIcon, UserIcon} from '../components/Icon/Icon';
import {appcolors} from '../utils/colors.util';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

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
            case 'HomeStack':
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
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default AppBottomTabs;
