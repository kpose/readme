import {Alert, Pressable, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import Screen from '../../components/Screen/Screen';
import {ScreenTitle} from '../../components/Text/Text';
import {IAuthScreenProps} from './interfaces';
import Input from '../../components/Input/Input';
import {appcolors} from '../../utils/colors.util';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import {useUser} from '../../providers/UserProvider';
import auth from '@react-native-firebase/auth';

const AuthScreen = ({navigation, route}: IAuthScreenProps) => {
  const {isSignup} = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [, /* authError */ setAuthError] = useState('');

  const {user, createUser, loginUser, authError} = useUser();
  console.log(user);

  const onSwitchPress = useCallback(() => {
    if (isSignup) {
      navigation.push('AuthScreen', {isSignup: !isSignup});
    }
    navigation.push('AuthScreen', {isSignup: !isSignup});
  }, [isSignup, navigation]);

  const handleButtonPress = useCallback(async () => {
    if (!email || !password) {
      return;
    }

    if (isSignup) {
      try {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            return Alert.alert('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              return Alert.alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              return Alert.alert('That email address is invalid!');
            }

            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            return Alert.alert('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              return Alert.alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              return Alert.alert('That email address is invalid!');
            }

            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [email, isSignup, password]);

  const isButtonDisabled = useCallback(() => {
    if (!email || !password || loading) {
      return true;
    }
    return false;
  }, [email, loading, password]);

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
          value={username}
          onChangeText={setUsername}
        />
      ) : null}
      <Input
        label="Email"
        placeholder="Enter your email"
        placeholderTextColor={appcolors.grey}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        placeholderTextColor={appcolors.grey}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={isSignup ? 'Sign Up' : loading ? 'loading' : 'Sign In'}
        style={styles.buttonContainer}
        onPress={handleButtonPress}
        disabled={isButtonDisabled()}
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
