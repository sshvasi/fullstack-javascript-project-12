import { createContext, useCallback, useMemo, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
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
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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

export { AuthContext };

export default AuthProvider;
