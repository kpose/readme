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
  user: FirebaseAuthTypes.User | null;
  createUser?: ({
    email,
    password,
  }: IAuthUserSignupProps) => Promise<FirebaseAuthTypes.UpdateProfile>;
  loginUser?: ({
    email,
    password,
  }: IAuthUserSignupProps) => Promise<FirebaseAuthTypes.UpdateProfile>;
  logoutUser?: () => void;
}

interface IUserContextProps {
  children: React.ReactNode;
}

interface IAuthUserSignupProps {
  email: string;
  password: string;
}

const initialState: IUserContext = {
  user: null,
};

const UserContext = createContext<IUserContext>(initialState);

export const UserProvider: FC<IUserContextProps> = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

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

  async function createUser({
    email,
    password,
  }: IAuthUserSignupProps): Promise<FirebaseAuthTypes.UserCredential | null> {
    if (!email || !password) {
      return null;
    }
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function loginUser({
    email,
    password,
  }: IAuthUserSignupProps): Promise<FirebaseAuthTypes.UserCredential | null> {
    if (!email || !password) {
      return null;
    }
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

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
    <UserContext.Provider value={{user, createUser, logoutUser, loginUser}}>
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
