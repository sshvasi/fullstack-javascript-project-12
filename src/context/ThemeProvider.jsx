import { useState, useMemo } from 'react';
import {
  createTheme,
  ThemeProvider as ColorThemeProvider,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import ColorModeContext from './ColorModeContext';

const ThemeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ColorThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ColorThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
