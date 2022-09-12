import {StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {ButtonProps} from './interfaces';
import Text from '../Text/Text';
import {appcolors} from '../../utils/colors.util';
import {useWindowDimensions} from 'react-native';

const Button: FC<ButtonProps> = ({
  title,
  style,
  disabled,
  loading,
  ...props
}) => {
  const {width} = useWindowDimensions();
  return (
    <Pressable
      style={[
        style,
        styles.button,
        {backgroundColor: disabled ? appcolors.grey : appcolors.primary},
        {width: width / 1.2},
      ]}
      {...props}>
      {loading ? (
        <Text style={styles.loadingText}>{'Processing ...'}</Text>
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 20,
  },
  loadingText: {
    fontSize: 14,
  },
});
