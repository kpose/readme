import {
  DefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#d4a373',
    // background: 'rgb(242, 242, 242)',
    // card: 'rgb(255, 255, 255)',
    // text: 'rgb(28, 28, 30)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    primary: '#d4a373',
    // background: 'rgb(242, 242, 242)',
    // card: 'rgb(255, 255, 255)',
    // text: 'rgb(28, 28, 30)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};

export const appcolors = {
  primary: '#d4a373',
};
