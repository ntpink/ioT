export const realtimeSensorsMock = {
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

export const sensorRecordsMock = [
  { id: '001', sensorType: 'Temperature', value: '28.5 °C', time: '14/10/2026 10:30:02' },
  { id: '002', sensorType: 'Humidity', value: '65 %', time: '14/10/2026 10:30:02' },
  { id: '003', sensorType: 'Light', value: '720 lux', time: '14/10/2026 10:30:02' },
  { id: '004', sensorType: 'Temperature', value: '29.0 °C', time: '14/10/2026 10:32:02' },
  { id: '005', sensorType: 'Humidity', value: '63 %', time: '14/10/2026 10:32:02' },
  { id: '006', sensorType: 'Light', value: '710 lux', time: '14/10/2026 10:32:02' },
  { id: '007', sensorType: 'Temperature', value: '27.8 °C', time: '14/10/2026 10:34:02' },
  { id: '008', sensorType: 'Humidity', value: '66 %', time: '14/10/2026 10:34:02' },
  { id: '009', sensorType: 'Light', value: '715 lux', time: '14/10/2026 10:35:00' },
  { id: '010', sensorType: 'Temperature', value: '28.2 °C', time: '14/10/2026 10:36:12' },
];

export const totalSensorRecordsCount = 10;
