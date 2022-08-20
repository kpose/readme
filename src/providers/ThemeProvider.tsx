import React from 'react';
import {createContext, FC, useCallback, useState, useContext} from 'react';

export interface IThemeContext {
  isDarkTheme: boolean;
  toggleTheme?: () => void;
}

interface IThemeContextProps {
  children: React.ReactNode;
}

const defaultState: IThemeContext = {
  isDarkTheme: false,
};

const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeProvider: FC<IThemeContextProps> = ({children}) => {
  const [isDarkTheme, setDark] = useState(true);

  const toggleTheme = useCallback(() => {
    setDark(!isDarkTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
