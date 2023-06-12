import { Navigate, Outlet } from 'react-router-dom';
import auth from '../services/auth';

const Guest = () =>
  auth.isTokenExpired()
    ? <Outlet />
    : <Navigate to="/dashboard" replace />;

export default Guest;
