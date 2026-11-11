import apiClient from './api';
import { actionHistoryMock } from '../mock/actionHistoryData';

const USE_MOCK = false; // CHUYỂN HOÀN TOÀN SANG DÙNG DỮ LIỆU THẬT TỪ BACKEND VÀ CẢM BIẾN

export const actionHistoryService = {
  /**
   * Lấy lịch sử thao tác thiết bị có lọc và phân trang từ Backend
   * API: GET /api/v1/action-history?page=1&pageSize=5&device=...&action=...&status=...&time=...
   */
  async getHistory(params = {}) {
    if (USE_MOCK) {
      let filtered = [...actionHistoryMock];

      // Lọc theo thiết bị nếu chọn
      if (params.device && params.device !== 'All Devices' && params.device !== 'All') {
        filtered = filtered.filter((item) =>
          item.device.toLowerCase().includes(params.device.toLowerCase())
        );
      }

      // Lọc theo hành động (Action)
      if (params.action && params.action !== 'All Actions' && params.action !== 'All') {
        filtered = filtered.filter((item) =>
          item.action.toLowerCase().includes(params.action.toLowerCase())
        );
      }

      // Lọc theo trạng thái (Status)
      if (params.status && params.status !== 'All Status' && params.status !== 'All') {
        filtered = filtered.filter(
          (item) => item.status.toLowerCase() === params.status.toLowerCase()
        );
      }

      // Lọc theo thời gian (Time) (Hỗ trợ xóa ngày, xóa giây, xóa tháng hoặc nhiều từ khóa)
      if (params.time && params.time.trim() !== '' && params.time !== 'All Time' && params.time !== 'All') {
        const tokens = params.time.toLowerCase().trim().replace(/\//g, '-').split(/\s+/).filter(Boolean);
        filtered = filtered.filter((item) => {
          const itemTime = (item.time || '').toLowerCase().replace(/\//g, '-');
          return tokens.every((token) => itemTime.includes(token));
        });
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 5;
      const startIndex = (page - 1) * pageSize;
      const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

      return Promise.resolve({
        data: paginatedData,
        total: filtered.length,
        page,
        pageSize,
        totalPages: Math.ceil(filtered.length / pageSize) || 1,
      });
    }

    try {
      return await apiClient.get('/action-history', params);
    } catch (err) {
      console.warn('Lỗi khi tải lịch sử thao tác từ backend:', err);
      return { data: [], total: 0, page: params.page || 1, pageSize: params.pageSize || 5, totalPages: 1 };
    }
  },

  /**
   * Thêm một bản ghi lịch sử thao tác mới (khi người dùng bật/tắt thiết bị)
   */
  addRecord({ device, action, operator = 'Nguyễn Thanh Bình', status = 'Success' }) {
    if (USE_MOCK) {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const year = now.getFullYear();
      const time = `${year}-${month}-${day} ${timeStr}`;
      const newRecord = {
        id: String(actionHistoryMock.length + 1).padStart(3, '0'),
        device,
        action,
        operator,
        status,
        time,
      };
      actionHistoryMock.unshift(newRecord);
      return newRecord;
    }
    // Khi dùng backend thật: Backend tự động ghi log vào bảng action_history trong MySQL
    return { device, action, operator, status };
  },
};

export default actionHistoryService;

