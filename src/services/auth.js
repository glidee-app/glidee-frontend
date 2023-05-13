class AuthService {

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAuthHeader() {
    const user = this.getCurrentUser()
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` }
    }
    return {}
  }
}

export default new AuthService();