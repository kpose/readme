import {PressableProps, ViewStyle} from 'react-native';

export interface ButtonProps extends PressableProps {
  title: string;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}
