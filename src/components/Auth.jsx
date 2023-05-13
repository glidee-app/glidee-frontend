import { Navigate, Outlet } from 'react-router-dom';
import auth from '../services/auth';

const Auth = () =>
  auth.getCurrentUser()
    ? <Outlet />
    : <Navigate to="/login" replace />;

export default Auth;
