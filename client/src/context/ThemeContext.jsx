import { createContext, useState, useMemo, useContext } from 'react';
import { lightTheme, darkTheme } from '../lib/theme.js';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  const value = useMemo(() => ({
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? darkTheme : lightTheme,
  }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
