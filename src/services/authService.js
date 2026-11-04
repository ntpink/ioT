import apiClient from './api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authService = {
  /**
   * Đăng nhập lấy JWT Bearer Token
   */
  async login(username, password) {
    const res = await apiClient.post('/auth/login', { username, password });
    if (res && res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res));
    }
    return res;
  },

  /**
   * Đăng ký tài khoản mới
   */
  async register(username, password, fullName) {
    const res = await apiClient.post('/auth/register', { username, password, fullName });
    if (res && res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res));
    }
    return res;
  },

  /**
   * Đăng xuất
   */
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = '/login';
  },

  /**
   * Lấy token hiện tại
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Lấy thông tin user hiện tại
   */
  getCurrentUser() {
    const userStr = localStorage.getItem(USER_KEY);
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  /**
   * Kiểm tra đã đăng nhập chưa
   */
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

export default authService;

