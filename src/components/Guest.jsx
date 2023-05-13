import { Navigate, Outlet } from 'react-router-dom';
import auth from '../services/auth';

const Guest = () =>
  !auth.getCurrentUser()
    ? <Outlet />
    : <Navigate to="/dashboard" replace />;

export default Guest;
