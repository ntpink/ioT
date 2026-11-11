/**
 * FILE: src/services/deviceService.js
 * CÔNG DỤNG: Tầng Service quản lý gọi API liên quan đến Thiết bị (Device).
 * - getDevices(): Lấy danh sách thiết bị (Đèn 1, Đèn 2...).
 * - updateDeviceStatus(id, status): Gửi yêu cầu cập nhật trạng thái bật/tắt thiết bị.
 * => Khi có Spring Boot: Chỉ cần đổi USE_MOCK = false ở dòng dưới là xong!
 */
import apiClient from './api';
import { devicesMock } from '../mock/deviceData';

const USE_MOCK = false; // CHUYỂN HOÀN TOÀN SANG DÙNG DỮ LIỆU THẬT TỪ BACKEND VÀ CẢM BIẾN

// Trạng thái local trong bộ nhớ mock
let localDevices = [...devicesMock];

export const deviceService = {
  /**
   * Lấy danh sách thiết bị điều khiển
   * API: GET /api/v1/devices
   */
  async getDevices() {
    if (USE_MOCK) {
      return Promise.resolve([...localDevices]);
    }
    try {
      const res = await apiClient.get('/devices');
      return Array.isArray(res) && res.length > 0 ? res : [
        { id: 1, name: 'Đèn 1', status: true, type: 'light' },
        { id: 2, name: 'Đèn 2', status: false, type: 'light' },
        { id: 3, name: 'Đèn 3', status: true, type: 'light' },
        { id: 4, name: 'Đèn 4', status: false, type: 'light' },
      ];
    } catch (err) {
      console.warn('Lỗi khi lấy danh sách thiết bị thật từ backend:', err);
      return [
        { id: 1, name: 'Đèn 1', status: true, type: 'light' },
        { id: 2, name: 'Đèn 2', status: false, type: 'light' },
        { id: 3, name: 'Đèn 3', status: true, type: 'light' },
        { id: 4, name: 'Đèn 4', status: false, type: 'light' },
      ];
    }
  },

  /**
   * Cập nhật trạng thái thiết bị (bật/tắt toggle)
   * API: PUT /api/v1/devices/{id}/status
   */
  async updateDeviceStatus(id, status) {
    if (USE_MOCK) {
      localDevices = localDevices.map((device) =>
        device.id === id ? { ...device, status } : device
      );
      const updated = localDevices.find((d) => d.id === id);
      return Promise.resolve(updated);
    }
    return apiClient.put(`/devices/${id}/status`, { status });
  },
};

export default deviceService;

