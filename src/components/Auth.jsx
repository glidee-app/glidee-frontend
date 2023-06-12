import { Navigate, Outlet } from 'react-router-dom';
import auth from '../services/auth';

const Auth = () =>
  auth.isTokenExpired()
    ? <Navigate to="/login" replace />
    : <Outlet />

export default Auth;
