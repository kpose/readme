import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IAppStackBottomTabList} from './interfaces';
import {CloudIcon} from '../components/Icon/Icon';
import {appcolors} from '../utils/colors.util';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import DownloadStack from './DownloadStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator<IAppStackBottomTabList>();

function AppBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'HomeStack') {
            return <CloudIcon size={25} />;
          } else if (route.name === 'SearchStack') {
            return <CloudIcon size={25} />;
          }
        },
        tabBarActiveTintColor: appcolors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="SearchStack" component={SearchStack} />
      <Tab.Screen name="DownloadStack" component={DownloadStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default AppBottomTabs;
