import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import router from '@/router';
import theme from '@/theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </CssVarsProvider>
  </React.StrictMode>,
);
