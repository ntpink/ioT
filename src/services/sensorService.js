import apiClient from './api';
import { sensorRecordsMock, totalSensorRecordsCount } from '../mock/sensorData';
import { realtimeChartMock } from '../mock/chartData';

const USE_MOCK = false; // CHUYỂN HOÀN TOÀN SANG DÙNG DỮ LIỆU THẬT TỪ BACKEND VÀ CẢM BIẾN

// 1. Dữ liệu thời gian thực cho Dashboard
let currentStep = 6;

// Giá trị 3 cảm biến hiện tại trên Dashboard
let liveRealtimeSensors = {
  temperature: {
    id: 'temp_01',
    name: 'Nhiệt độ (Temperature)',
    value: 28.5,
    unit: '°C',
    type: 'Temperature',
  },
  humidity: {
    id: 'hum_01',
    name: 'Độ ẩm (Humidity)',
    value: 65,
    unit: '%',
    type: 'Humidity',
  },
  light: {
    id: 'light_01',
    name: 'Ánh sáng (Light)',
    value: 720,
    unit: 'lux',
    type: 'Light',
  },
};

// Dữ liệu biểu đồ (giữ 6 mốc giờ gần nhất)
let liveChartData = [...realtimeChartMock];

// Danh sách component đang đăng ký nhận dữ liệu thời gian thực
const subscribers = new Set();

const notifySubscribers = () => {
  subscribers.forEach((callback) => {
    try {
      callback({
        sensors: liveRealtimeSensors,
        chartData: liveChartData,
      });
    } catch (e) {
      console.error('Error notifying sensor subscriber:', e);
    }
  });
};

// 2. Bộ đếm tự sinh dữ liệu cho Biểu đồ Dashboard: Chu kỳ ĐÚNG 2 GIÂY (2000ms) - Chỉ chạy khi USE_MOCK = true
if (typeof window !== 'undefined' && USE_MOCK) {
  setInterval(() => {
    currentStep++;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0]; // HH:mm:ss

    // Dao động đồ thị có biên độ rõ rệt (uốn lượn sóng tự nhiên, đỉnh và đáy rõ ràng)
    const tempWave = Math.round(
      45 + Math.sin(currentStep * 0.75) * 18 + (Math.random() - 0.5) * 8
    );
    const humWave = Math.round(
      56 + Math.cos(currentStep * 0.65) * 17 + (Math.random() - 0.5) * 8
    );
    const lightWave = Math.round(
      52 + Math.sin(currentStep * 0.85 + 1.2) * 26 + (Math.random() - 0.5) * 10
    );

    // Giá trị thực tế hiển thị trên 3 Card Dashboard
    const currentTemp = Number((26.5 + (tempWave / 100) * 5.0).toFixed(1)); // 27.0 - 30.5 °C
    const currentHum = Math.round(humWave); // 50 - 75 %
    const currentLight = Math.round(420 + (lightWave / 100) * 440); // 500 - 820 lux

    // Cập nhật giá trị hiển thị 3 Card
    liveRealtimeSensors = {
      temperature: { ...liveRealtimeSensors.temperature, value: currentTemp },
      humidity: { ...liveRealtimeSensors.humidity, value: currentHum },
      light: { ...liveRealtimeSensors.light, value: currentLight },
    };

    // Cập nhật Biểu đồ (thêm điểm mới, giữ 6 điểm để trượt ngang liên tục)
    const newChartPoint = {
      time: timeStr,
      temperature: currentTemp,
      humidity: currentHum,
      light: currentLight,
    };
    liveChartData = [...liveChartData.slice(1), newChartPoint];

    // Báo cho Dashboard cập nhật biểu đồ và 3 thẻ cảm biến
    notifySubscribers();
  }, 2000); // ĐÚNG 2 GIÂY
}

export const sensorService = {
  /**
   * Đăng ký lắng nghe dữ liệu thời gian thực (realtime listener cho Dashboard)
   * - Khi USE_MOCK = true: Lắng nghe qua bộ đếm giả lập local.
   * - Khi USE_MOCK = false: Lắng nghe qua Server-Sent Events (SSE) trực tiếp từ Spring Boot.
   */
  subscribe(callback) {
    if (USE_MOCK) {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    }

    // Kết nối luồng thời gian thực SSE từ Spring Boot Backend (kèm token xác thực)
    let eventSource = null;
    try {
      const token = localStorage.getItem('auth_token') || '';
      const streamUrl = `${apiClient.baseURL}/sensors/stream${token ? `?token=${encodeURIComponent(token)}` : ''}`;
      eventSource = new EventSource(streamUrl);
      eventSource.addEventListener('sensor_update', (event) => {
        try {
          const payload = JSON.parse(event.data);
          callback(payload);
        } catch (e) {
          console.error('Lỗi khi phân tích dữ liệu cảm biến thời gian thực:', e);
        }
      });
      eventSource.onerror = (err) => {
        console.warn('Luồng SSE đang kết nối lại...', err);
      };
    } catch (err) {
      console.error('Không thể mở kết nối SSE:', err);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  },

  /**
   * Lấy dữ liệu cảm biến mới nhất (Hiển thị 3 card trên Dashboard)
   */
  async getRealtimeSensors() {
    if (USE_MOCK) {
      return Promise.resolve(liveRealtimeSensors);
    }
    try {
      return await apiClient.get('/sensors/realtime');
    } catch (err) {
      console.warn('Chưa kết nối được Backend, vui lòng đảm bảo Backend đang chạy ở port 8080:', err);
      return {
        temperature: { id: 'temp_01', name: 'Nhiệt độ (Temperature)', value: '--', unit: '°C', type: 'Temperature' },
        humidity: { id: 'hum_01', name: 'Độ ẩm (Humidity)', value: '--', unit: '%', type: 'Humidity' },
        light: { id: 'light_01', name: 'Ánh sáng (Light)', value: '--', unit: 'lux', type: 'Light' }
      };
    }
  },

  /**
   * Lấy dữ liệu biểu đồ theo dõi thời gian thực
   */
  async getChartData() {
    if (USE_MOCK) {
      return Promise.resolve(liveChartData);
    }
    try {
      const res = await apiClient.get('/sensors/chart');
      return Array.isArray(res) ? res : [];
    } catch (err) {
      console.warn('Chưa lấy được dữ liệu biểu đồ từ backend:', err);
      return [];
    }
  },

  /**
   * Lấy danh sách lịch sử dữ liệu cảm biến (Data Sensor)
   */
  async getSensors(params = {}) {
    if (USE_MOCK) {
      const page = params.page || 1;
      const pageSize = params.pageSize || 5;
      let filteredData = [...sensorRecordsMock];

      // Lọc theo loại cảm biến (Sensor Type)
      if (params.type && params.type !== 'All Sensors' && params.type !== 'All') {
        filteredData = filteredData.filter((item) =>
          item.sensorType.toLowerCase().includes(params.type.toLowerCase())
        );
      }

      // Lọc theo giá trị (Value) nếu người dùng nhập
      if (params.value && params.value.trim() !== '') {
        const valQuery = params.value.toLowerCase().trim();
        filteredData = filteredData.filter((item) =>
          item.value.toLowerCase().includes(valQuery)
        );
      }

      // Lọc theo thời gian (Time) nếu người dùng nhập (Hỗ trợ định dạng Năm-Tháng-Ngày Giờ:Phút:Giây)
      if (params.time && params.time.trim() !== '') {
        const timeQuery = params.time.toLowerCase().trim().replace(/\//g, '-');
        filteredData = filteredData.filter((item) => {
          const itemTime = (item.time || '').toLowerCase().replace(/\//g, '-');
          return itemTime.includes(timeQuery);
        });
      }

      const total = filteredData.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

      return Promise.resolve({
        data: paginatedData,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize) || 1,
      });
    }

    try {
      return await apiClient.get('/sensors', params);
    } catch (err) {
      console.warn('Lỗi khi tải bảng dữ liệu cảm biến từ backend:', err);
      return { data: [], total: 0, page: params.page || 1, pageSize: params.pageSize || 5, totalPages: 1 };
    }
  },
};

export default sensorService;
