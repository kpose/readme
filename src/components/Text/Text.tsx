import React, {useCallback} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {TextProps, FontWeight} from './interfaces';
import {appcolors} from '../../utils/colors.util';
import {useTheme} from '../../providers/ThemeProvider';

/**
 * This gets the font style for the text component,
 * defaults to book font style.
 * @param weight FontWeight
 */
const getFontWeight = (weight?: FontWeight) => {
  switch (weight) {
    case 'thin':
    case 'extra-light':
    case 'light':
    case '300':
      return styles.light;
    case 'medium':
    case '500':
    case 'semi-bold':
      return styles.medium;
    case 'bold':
    case '700':
    case 'extra-bold':
    case 'black':
      return styles.bold;
    default:
      return null;
  }
};

export const Text: React.FC<TextProps> = function Text({
  weight,
  style,
  ...props
}) {
  const {isDarkTheme} = useTheme();

  /**
   * This gets the font color, defaults to colors.text.
   * @param weight FontWeight
   */
  const getBaseColor = useCallback(() => {
    if (isDarkTheme) {
      return styles.textDark;
    }
    return styles.text;
  }, [isDarkTheme]);

  return (
    <RNText
      style={[styles.base, getBaseColor(), style, getFontWeight(weight)]}
      {...props}
    />
  );
};

export const ScreenTitle: React.FC<Omit<TextProps, 'weight'>> =
  function ScreenTitle({children, style, ...props}) {
    return (
      <Text
        {...props}
        style={[
          styles.screenTitle,
          style,
          styles.millikFont,
          styles.screenTitleFixed,
        ]}>
        {children}
      </Text>
    );
  };

const styles = StyleSheet.create({
  screenTitle: {
    marginBottom: 23,
  },
  screenTitleFixed: {
    fontSize: 30,
    lineHeight: 30,
  },
  base: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  light: {
    fontFamily: 'OpenSans-Light',
  },
  medium: {
    fontFamily: 'OpenSans-Medium',
  },
  bold: {
    fontFamily: 'OpenSans-Bold',
  },
  millikFont: {
    fontFamily: 'Millik',
  },
  textDark: {
    color: appcolors.light,
  },
  text: {
    color: appcolors.dark,
  },
});

export default Text;
