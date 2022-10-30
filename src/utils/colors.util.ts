export const appcolors = {
  primary: '#BC6C25',
  light: '#FFFFFF',
  dark: '#222222',
  error: '#BF0000',
  grey: '#808080',
  secondary: '#FEFAE0',
  lightBackground: '#DEE4E7',
  darkBackground: '#263238',
  darkGrey: '#4C4E52',
  lightGrey: '#ABB0B8',
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: appcolors.primary,
    background: appcolors.darkBackground,
    text: appcolors.light,
    card: appcolors.darkBackground,
    border: appcolors.grey,
    notification: appcolors.primary,
  },
};

export const LightTheme = {
  dark: false,
  colors: {
    primary: appcolors.primary,
    background: appcolors.lightBackground,
    text: appcolors.dark,
    card: appcolors.lightBackground,
    border: appcolors.grey,
    notification: appcolors.primary,
  },
};
