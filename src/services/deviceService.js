/**
 * FILE: src/services/deviceService.js
 * CÔNG DỤNG: Tầng Service quản lý gọi API liên quan đến Thiết bị (Device).
 * - Tích hợp lưu trữ trạng thái cuối cùng vào LocalStorage:
 *   Đảm bảo khi người dùng F5 hoặc reload trang, trạng thái Bật/Tắt của các đèn luôn được giữ nguyên!
 */
import apiClient from './api';
import { devicesMock } from '../mock/deviceData';

const USE_MOCK = false; // CHUYỂN HOÀN TOÀN SANG DÙNG DỮ LIỆU THẬT TỪ BACKEND VÀ CẢM BIẾN
const STORAGE_KEY = 'iot_device_statuses';

// Lấy bản đồ trạng thái đã lưu trong LocalStorage { 1: true, 2: false, 3: true, 4: false }
const getSavedStatuses = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// Lưu danh sách trạng thái vào LocalStorage
const saveStatuses = (devicesList) => {
  try {
    if (Array.isArray(devicesList)) {
      const map = getSavedStatuses() || {};
      devicesList.forEach((d) => {
        if (d && d.id !== undefined && d.status !== undefined) {
          map[d.id] = Boolean(d.status);
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    }
  } catch {}
};

// Trạng thái local trong bộ nhớ mock
let localDevices = [...devicesMock];

export const deviceService = {
  /**
   * Lấy danh sách thiết bị điều khiển (kèm trạng thái cuối cùng đã lưu)
   * API: GET /api/v1/devices
   */
  async getDevices() {
    const savedMap = getSavedStatuses();

    // Hàm hợp nhất trạng thái đã lưu nếu backend chưa trả về hoặc đang tải
    const applySavedStatus = (list) => {
      if (!savedMap) return list;
      return list.map((d) => (savedMap[d.id] !== undefined ? { ...d, status: savedMap[d.id] } : d));
    };

    if (USE_MOCK) {
      return Promise.resolve(applySavedStatus([...localDevices]));
    }

    try {
      const res = await apiClient.get('/devices');
      if (Array.isArray(res) && res.length > 0) {
        saveStatuses(res);
        return res;
      }
    } catch (err) {
      console.warn('Lỗi khi lấy danh sách thiết bị thật từ backend, sử dụng trạng thái lưu trữ cuối cùng:', err);
    }

    // Fallback: Lấy chính xác trạng thái cuối cùng người dùng đã thao tác từ LocalStorage
    const fallback = [1, 2, 3, 4].map((id) => ({
      id,
      name: `Đèn ${id}`,
      status: savedMap && savedMap[id] !== undefined ? savedMap[id] : false,
      type: 'light',
    }));
    return fallback;
  },

  /**
   * Cập nhật trạng thái thiết bị (bật/tắt toggle)
   * API: PUT /api/v1/devices/{id}/status
   */
  async updateDeviceStatus(id, status) {
    // 1. Cập nhật ngay lập tức vào LocalStorage để reload trang vẫn giữ nguyên
    const savedMap = getSavedStatuses() || {};
    savedMap[id] = Boolean(status);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMap));

    // Cập nhật localDevices mock
    localDevices = localDevices.map((device) =>
      device.id === id ? { ...device, status: Boolean(status) } : device
    );

    if (USE_MOCK) {
      const updated = localDevices.find((d) => d.id === id);
      return Promise.resolve(updated);
    }

    try {
      const res = await apiClient.put(`/devices/${id}/status`, { status: Boolean(status) });
      return res;
    } catch (err) {
      console.warn('Backend chưa phản hồi lệnh cập nhật, giữ trạng thái cuối cùng trên giao diện:', err);
      return { id, name: `Đèn ${id}`, status: Boolean(status), type: 'light' };
    }
  },
};

export default deviceService;
