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
   * Kiểm tra xem JWT Token đã hết hạn chưa
   */
  isTokenExpired(token) {
    if (!token) return true;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      // Giải mã payload base64 của JWT
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      if (!payload.exp) return false;
      // exp tính bằng giây, Date.now() tính bằng mili giây
      return payload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  },

  /**
   * Kiểm tra đã đăng nhập chưa (kèm kiểm tra token còn hạn)
   */
  isAuthenticated() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  },
};

export default authService;

