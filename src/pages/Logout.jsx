import { Navigate } from "react-router-dom";
import auth from "../services/auth";

const Logout = () =>
  auth.logout() && <Navigate to="/login" replace />;

export default Logout;