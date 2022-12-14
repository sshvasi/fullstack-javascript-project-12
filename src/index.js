import { StrictMode } from 'react';
import { createRoot } from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_INFO } from '@rollbar/react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import Error from '@/pages/Error';
import store from '@/app/store';
import router from '@/app/router';
import theme from '@/app/theme';
import '@/app/i18n';

const CODE_VERSION = '1.0.0';
const ROOT_ID = 'root';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: CODE_VERSION,
        guess_uncaught_frames: true,
      },
    },
  },
};

const container = document.getElementById(ROOT_ID);
const root = createRoot(container);

root.render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <StoreProvider store={store}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary level={LEVEL_INFO} fallbackUI={Error}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </CssVarsProvider>
      </StoreProvider>
    </RollbarProvider>
  </StrictMode>,
);
