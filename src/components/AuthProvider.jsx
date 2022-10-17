import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null,
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem('username') || null,
  );
  const loggedIn = !!token;

  const logIn = useCallback((data) => {
    const { token, username } = data;
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    navigate('/');
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  }, []);

  const authInfo = useMemo(
    () => ({
      token,
      username,
      loggedIn,
      logIn,
      logOut,
    }),
    [token, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export { useAuth, AuthContext };

export default AuthProvider;
