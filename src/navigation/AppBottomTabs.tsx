import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IAppStackBottomTabList} from './interfaces';
import {
  DownloadIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from '../components/Icon/Icon';
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
        title: '',
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case 'HomeStack':
              return <HomeIcon size={size} color={color} />;
            case 'SearchStack':
              return <SearchIcon size={size} color={color} />;
            case 'DownloadStack':
              return <DownloadIcon size={size} color={color} />;
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
      <Tab.Screen name="SearchStack" component={SearchStack} />
      <Tab.Screen name="DownloadStack" component={DownloadStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default AppBottomTabs;
