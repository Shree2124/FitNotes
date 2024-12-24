import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define the theme configuration for light and dark themes
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
    appBar: {
      background: 'transparent',
      textColor: '#ffffff',
    },
  },
} as ThemeOptions);

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
    appBar: {
      background: 'transparent',
      textColor: '#ffffff',
    },
  },
} as ThemeOptions);
