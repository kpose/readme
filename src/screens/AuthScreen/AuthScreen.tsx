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
import {asyncStore, storeData} from '../../utils/Async.util';
import {STORE_KEYS} from '../../utils/Keys.util';

const AuthScreen = ({navigation, route}: IAuthScreenProps) => {
  const {isSignup} = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const {createUser, loginUser} = useUser();

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
        if (!createUser) {
          return;
        }
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            password,
            username: username.toLowerCase(),
          }),
        });
        let json = await response.json();
        console.log(json);
        if (json.accessToken) {
          // persist data and login
          await asyncStore(STORE_KEYS.AUTH_TOKEN, json.accessToken).then(() => {
            navigation.navigate('AppBottomTabs');
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      try {
        if (!loginUser) {
          return;
        }
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            password,
          }),
        });
        let json = await response.json();
        if (json.accessToken) {
          // persist data and login
          await asyncStore(STORE_KEYS.AUTH_TOKEN, json.accessToken).then(() => {
            navigation.navigate('AppBottomTabs');
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [createUser, email, isSignup, loginUser, navigation, password, username]);

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
        title={isSignup ? 'Sign Up' : 'Sign In'}
        style={styles.buttonContainer}
        onPress={handleButtonPress}
        disabled={isButtonDisabled()}
        loading={loading}
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
