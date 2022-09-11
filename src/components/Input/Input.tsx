import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {InputProps} from './interfaces';
import Text from '../Text/Text';
import {appcolors} from '../../utils/colors.util';

const Input = ({label, style, ...props}: InputProps) => {
  return (
    <View style={[style, styles.inputContainer]}>
      <Text style={styles.label}>{label ? label : null}</Text>
      <TextInput {...props} style={[styles.input]} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: appcolors.grey,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    color: appcolors.primary,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 7,
    opacity: 0.5,
  },
});
