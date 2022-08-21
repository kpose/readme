import {Pressable, StyleSheet, TextInput, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import {ScreenTitle} from '../../components/Text/Text';
import {useSpeach} from '../../providers/SpeachProvider';
import {useIsFocused} from '@react-navigation/native';

const FirstName = () => {
  const [firstname, setfirrstname] = useState<string>('');
  const [title /* setTitle */] = useState('What is your first name?');
  const isFocused = useIsFocused();
  const {startSpeach, speachLocation} = useSpeach();
  console.log(speachLocation);

  useEffect(() => {
    if (!isFocused || !title) {
      return;
    }
    const timeout = setTimeout(() => startSpeach(title), 900);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocused, startSpeach, title]);

  return (
    <Screen>
      <ScreenTitle>{title}</ScreenTitle>

      <Text style={styles.text}>Welcome home</Text>
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
  text: {
    color: 'red',
  },
});
