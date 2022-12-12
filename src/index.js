import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_INFO } from '@rollbar/react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import Error from '@/pages/Error';
import store from '@/store';
import router from '@/router';
import theme from '@/theme';
import '@/utils/i18n';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: '1.0.0',
        guess_uncaught_frames: true,
      },
    },
  },
};

root.render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
