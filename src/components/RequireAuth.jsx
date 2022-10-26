import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '@hooks/useAuth';

const RequireAuth = () => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
