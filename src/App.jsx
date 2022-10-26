import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import AuthProvider from '@context/AuthProvider';
import ThemeProvider from '@context/ThemeProvider';
import Layout from '@components/Layout';
import RequireAuth from '@components/RequireAuth';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import NotFoundPage from '@pages/NotFoundPage';
import Chat from '@pages/ChatPage';
import store from '@store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Chat />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const App = () => (
  <ThemeProvider>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </ThemeProvider>
);

export default App;
