import {
  DefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    primary: '#d4a373',
    background: '#DEE4E7',
    text: '#222222',
    // card: 'rgb(255, 255, 255)',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    primary: '#d4a373',
    background: '#263238',
    text: '#FFFFFF',
    // border: 'rgb(199, 199, 204)',
    // notification: 'rgb(255, 69, 58)',
    // card: 'rgb(255, 255, 255)',
  },
};

export const appcolors = {
  primary: '#d4a373',
  light: '#FFFFFF',
  dark: '#222222',
  error: '#BF0000',
  grey: '#808080',
};
