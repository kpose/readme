import {StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import {useSpeach} from '../../providers/SpeachProvider';
import {useIsFocused} from '@react-navigation/native';
import SpeachTextTitle from '../../components/Text/SpeachTextTitle';

const FirstName = () => {
  const [firstname, setfirrstname] = useState<string>('');
  const [title /* setTitle */] = useState('What is your first name?');
  const isFocused = useIsFocused();
  const {startSpeach} = useSpeach();

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
      <SpeachTextTitle title={title} />

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
