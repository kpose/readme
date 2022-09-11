import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {appcolors} from '../utils/colors.util';

interface IUserContext {
  isSignedIn: boolean;
  user: FirebaseAuthTypes.User | null;
  createUser?: ({email, password}: IAuthUserSignupProps) => {};
  loginUser?: ({email, password}: IAuthUserSignupProps) => {};
  logoutUser?: () => void;
  authError?: string;
}

interface IUserContextProps {
  children: React.ReactNode;
}

interface IAuthUserSignupProps {
  email: string;
  password: string;
}

const initialState: IUserContext = {
  isSignedIn: false,
  user: null,
};

const UserContext = createContext<IUserContext>(initialState);

export const UserProvider: FC<IUserContextProps> = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authError, setAuthError] = useState('');

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (userBody: FirebaseAuthTypes.User) => {
      setUser(userBody);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing, onAuthStateChanged]);

  const createUser = useCallback(
    async ({email, password}: IAuthUserSignupProps) => {
      if (!email || !password) {
        return;
      }
      try {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((x: any) => {
            Promise.resolve(x);
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setAuthError("'That email address is already in use!'");
            }

            if (error.code === 'auth/invalid-email') {
              setAuthError('That email address is invalid!');
            }

            setAuthError(error.message);
            return Promise.reject(error.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const loginUser = useCallback(
    async ({email, password}: IAuthUserSignupProps) => {
      if (!email || !password) {
        return;
      }
      try {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setIsSignedIn(true);
          })
          .catch(error => {
            setAuthError(error.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const logoutUser = useCallback(async () => {
    try {
      auth()
        .signOut()
        .then(() => Promise.resolve('User signed out!'));
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (initializing) {
    return (
      <View style={styles.initContainer}>
        <ActivityIndicator size={'small'} color={appcolors.primary} />
      </View>
    );
  }

  return (
    <UserContext.Provider
      value={{isSignedIn, user, createUser, logoutUser, loginUser, authError}}>
      {children}
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  initContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appcolors.grey,
  },
});

export const useUser = () => useContext(UserContext);
