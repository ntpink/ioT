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
  co2: {
    id: 'co2_01',
    name: 'Nồng độ CO₂',
    value: 450,
    unit: 'ppm',
    type: 'CO2',
  },
};

export const sensorRecordsMock = [
  { id: '001', sensorType: 'Temperature', value: '28.5 °C', time: '2026-10-14 10:30:02' },
  { id: '002', sensorType: 'Humidity', value: '65 %', time: '2026-10-14 10:30:02' },
  { id: '003', sensorType: 'Light', value: '720 lux', time: '2026-10-14 10:30:02' },
  { id: '004', sensorType: 'CO2', value: '450 ppm', time: '2026-10-14 10:30:02' },
  { id: '005', sensorType: 'Temperature', value: '29.0 °C', time: '2026-10-14 10:32:02' },
  { id: '006', sensorType: 'Humidity', value: '63 %', time: '2026-10-14 10:32:02' },
  { id: '007', sensorType: 'Light', value: '710 lux', time: '2026-10-14 10:32:02' },
  { id: '008', sensorType: 'CO2', value: '462 ppm', time: '2026-10-14 10:32:02' },
  { id: '009', sensorType: 'Temperature', value: '27.8 °C', time: '2026-10-14 10:34:02' },
  { id: '010', sensorType: 'Humidity', value: '66 %', time: '2026-10-14 10:34:02' },
  { id: '011', sensorType: 'Light', value: '715 lux', time: '2026-10-14 10:35:00' },
  { id: '012', sensorType: 'CO2', value: '445 ppm', time: '2026-10-14 10:35:00' },
];

export const totalSensorRecordsCount = 12;
