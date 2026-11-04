import apiClient from './api';
import { profileMock } from '../mock/profileData';

const USE_MOCK = true;

export const profileService = {
  /**
   * Lấy thông tin cá nhân và tài nguyên dự án
   * Dự kiến API: GET /api/v1/profile
   */
  async getProfile() {
    if (USE_MOCK) {
      return Promise.resolve({ ...profileMock });
    }
    return apiClient.get('/profile');
  },
};

export default profileService;

