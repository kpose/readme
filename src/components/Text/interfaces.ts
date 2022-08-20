import {TextProps as RNTextProps} from 'react-native';

export type FontWeight =
  | 'thin'
  | 'extra-light'
  | 'light'
  | 'medium'
  | 'semi-bold'
  | 'bold'
  | 'extra-bold'
  | 'black'
  | '300'
  | '400'
  | '500'
  | '700';

export interface TextProps extends RNTextProps {
  weight?: FontWeight;
}
