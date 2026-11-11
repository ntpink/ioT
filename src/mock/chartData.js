/**
 * FILE: src/mock/chartData.js
 * CÔNG DỤNG: Dữ liệu mẫu khởi tạo ban đầu cho Biểu đồ thời gian thực:
 * - temperature: Nhiệt độ (°C, thang đo 0 - 50°C).
 * - humidity: Độ ẩm (%, thang đo 0 - 100%).
 * - light: Ánh sáng (lux, thang đo 0 - 1000 lux).
 * - co2: Nồng độ CO2 (ppm, thang đo 350 - 1000 ppm).
 */
export const realtimeChartMock = [
  {
    time: '10:30:00',
    temperature: 28.5,
    humidity: 65,
    light: 720,
    co2: 450,
  },
  {
    time: '10:30:02',
    temperature: 29.0,
    humidity: 63,
    light: 710,
    co2: 458,
  },
  {
    time: '10:30:04',
    temperature: 27.8,
    humidity: 66,
    light: 715,
    co2: 442,
  },
  {
    time: '10:30:06',
    temperature: 28.2,
    humidity: 64,
    light: 705,
    co2: 465,
  },
  {
    time: '10:30:08',
    temperature: 28.7,
    humidity: 65,
    light: 730,
    co2: 472,
  },
  {
    time: '10:30:10',
    temperature: 29.1,
    humidity: 66,
    light: 725,
    co2: 450,
  },
];
