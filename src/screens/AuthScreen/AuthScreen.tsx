import {Pressable, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import Screen from '../../components/Screen/Screen';
import {ScreenTitle} from '../../components/Text/Text';
import {IAuthScreenProps} from './interfaces';
import Input from '../../components/Input/Input';
import {appcolors} from '../../utils/colors.util';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';

const AuthScreen = ({navigation, route}: IAuthScreenProps) => {
  const {isSignup} = route.params;
  console.log(isSignup);

  const onSwitchPress = useCallback(() => {
    if (isSignup) {
      navigation.push('AuthScreen', {isSignup: !isSignup});
    }
    navigation.push('AuthScreen', {isSignup: !isSignup});
  }, [isSignup, navigation]);
  return (
    <Screen>
      {/* header */}
      <ScreenTitle style={styles.headerTitle}>
        {isSignup ? 'Sign up' : 'Sign in'}
      </ScreenTitle>

      {isSignup ? (
        <Input
          label="Username"
          placeholder="Enter your username"
          placeholderTextColor={appcolors.grey}
        />
      ) : null}
      <Input
        label="Email"
        placeholder="Enter your email"
        placeholderTextColor={appcolors.grey}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        placeholderTextColor={appcolors.grey}
      />

      <Button
        title={isSignup ? 'Sign Up' : 'Sign In'}
        style={styles.buttonContainer}
      />

      <Pressable onPress={onSwitchPress}>
        <Text style={styles.switchContainer}>
          {isSignup ? "Don't have an account?" : 'Already have an account?'}{' '}
          <Text weight="bold" style={styles.switchAction}>
            {isSignup ? ' Sign in' : 'Sign up'}
          </Text>
        </Text>
      </Pressable>
    </Screen>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 50,
  },
  switchContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  switchAction: {
    color: appcolors.primary,
  },
});
