import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Screen from '../../components/Screen/Screen';
import {ScreenTitle} from '../../components/Text/Text';

const FirstName = () => {
  const [firstname, setfirrstname] = useState<string>('');
  return (
    <Screen>
      <ScreenTitle>What is your first name?</ScreenTitle>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setfirrstname}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </Screen>
  );
};

export default FirstName;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
