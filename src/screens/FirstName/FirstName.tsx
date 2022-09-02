import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  KeyboardEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import {useSpeach} from '../../providers/SpeachProvider';
import {useIsFocused} from '@react-navigation/native';
import SpeachTextTitle from '../../components/Text/SpeachTextTitle';
import {appcolors} from '../../utils/colors.util';
import {useTheme} from '../../providers/ThemeProvider';
import Button from '../../components/Button/Button';
import {IFirstNameScreenProps} from './interfaces';

const FirstName = ({navigation}: IFirstNameScreenProps) => {
  const [firstname, setfirrstname] = useState<string>('');
  const [title /* setTitle */] = useState('What is your first name?');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isFocused = useIsFocused();
  const {startSpeach} = useSpeach();
  const {isDarkTheme} = useTheme();

  useEffect(() => {
    if (!isFocused || !title) {
      return;
    }
    const timeout = setTimeout(() => startSpeach(title), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFocused, startSpeach, title]);

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height + 20);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(20);
  }
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Screen>
      <SpeachTextTitle title={title} />

      <TextInput
        style={[
          styles.input,
          {color: isDarkTheme ? appcolors.light : appcolors.dark},
        ]}
        value={firstname}
        keyboardAppearance={isDarkTheme ? 'dark' : 'light'}
        autoFocus={true}
        onChangeText={setfirrstname}
        returnKeyType="done"
        placeholder="Your name"
        placeholderTextColor={appcolors.grey}
      />

      <View style={[styles.buttonContainer, {bottom: keyboardHeight}]}>
        <Button
          title="Continue"
          disabled={firstname ? false : true}
          onPress={() => navigation.navigate('AppStack')}
        />
      </View>
    </Screen>
  );
};

export default FirstName;

const styles = StyleSheet.create({
  input: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: appcolors.grey,
    padding: 10,
    fontSize: 30,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
