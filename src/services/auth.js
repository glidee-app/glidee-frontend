import { decodeToken } from "react-jwt";

class AuthService {

  logout() {
    localStorage.removeItem("user");
    return true;
  }

  getCurrentUser() {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    return decodeToken(token);
  }

  getAuthHeader() {
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
      return { Authorization: `Bearer ${token}` }
    }
    return {}
  }
}

export default new AuthService();