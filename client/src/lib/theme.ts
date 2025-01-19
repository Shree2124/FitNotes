import { createTheme, ThemeOptions } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#313131',
    },
    secondary: {
      main: '#dc0f4e',
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
      main: '#fff',
    },
    secondary: {
      main: '#000',
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
