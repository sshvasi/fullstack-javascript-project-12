import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from '@components/AuthProvider';
import ThemeProvider from '@components/ThemeProvider';
import Layout from '@components/Layout';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import NotFoundPage from '@pages/NotFoundPage';
import Chat from '@pages/ChatPage';

const App = () => (
  <ThemeProvider>
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </ThemeProvider>
);

export default App;
