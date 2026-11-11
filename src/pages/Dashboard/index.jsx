import React, { useState, useEffect } from 'react';
import SensorCard from '../../components/dashboard/SensorCard';
import RealtimeChart from '../../components/dashboard/RealtimeChart';
import DeviceControl from '../../components/dashboard/DeviceControl';
import sensorService from '../../services/sensorService';
import deviceService from '../../services/deviceService';
import actionHistoryService from '../../services/actionHistoryService';

export const Dashboard = () => {
  const [sensors, setSensors] = useState(null);
  const [chartData, setChartData] = useState([]);
  // Khởi tạo ngay trạng thái cuối cùng từ LocalStorage để khi F5 / Reload trang giữ nguyên 100%
  const [devices, setDevices] = useState(() => {
    try {
      const saved = localStorage.getItem('iot_device_statuses');
      const savedMap = saved ? JSON.parse(saved) : null;
      return [1, 2, 3, 4].map((id) => ({
        id,
        name: `Đèn ${id}`,
        status: savedMap && savedMap[id] !== undefined ? Boolean(savedMap[id]) : false,
        type: 'light',
      }));
    } catch {
      return [];
    }
  });
  const [pendingDevices, setPendingDevices] = useState({});
  const [loading, setLoading] = useState(true);

  // 1. Tải dữ liệu ban đầu và Lắng nghe luồng dữ liệu thời gian thực 2 giây từ sensorService
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sensorRes, chartRes, deviceRes] = await Promise.all([
          sensorService.getRealtimeSensors(),
          sensorService.getChartData(),
          deviceService.getDevices(),
        ]);
        setSensors(sensorRes);
        setChartData(chartRes);
        setDevices(deviceRes);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Tự động kéo dữ liệu mới nhất mỗi 2 giây (đảm bảo luôn đồng bộ với MySQL và ESP8266)
    const intervalId = setInterval(fetchData, 2000);

    // Lắng nghe cập nhật thời gian thực từ SSE (nếu có)
    const unsubscribe = sensorService.subscribe(({ sensors: liveSensors, chartData: liveChart }) => {
      if (liveSensors) setSensors({ ...liveSensors });
      if (liveChart) setChartData([...liveChart]);
    });

    return () => {
      clearInterval(intervalId);
      unsubscribe();
    };
  }, []);

  const handleToggleDevice = (id, newStatus) => {
    // Nếu thiết bị đang trong quá trình chuyển trạng thái 0.5s thì không nhận click tiếp
    if (pendingDevices[id]) return;

    const targetDevice = devices.find((d) => d.id === id);
    const deviceName = targetDevice ? targetDevice.name : `Đèn ${id}`;

    // 1. Kích hoạt trạng thái chuyển đổi (Pending): 'turning_on' hoặc 'turning_off'
    setPendingDevices((prev) => ({
      ...prev,
      [id]: newStatus ? 'turning_on' : 'turning_off',
    }));

    // Cập nhật ngay lập tức vào LocalStorage để reload trang (F5) lập tức giữ nguyên trạng thái mới
    try {
      const saved = localStorage.getItem('iot_device_statuses');
      const savedMap = saved ? JSON.parse(saved) : {};
      savedMap[id] = Boolean(newStatus);
      localStorage.setItem('iot_device_statuses', JSON.stringify(savedMap));
    } catch {}

    // 2. Ghi nhận bản ghi thao tác vào lịch sử với trạng thái "Pending"
    const record = actionHistoryService.addRecord({
      device: deviceName,
      action: newStatus ? 'Turn ON' : 'Turn OFF',
      operator: 'Nguyễn Thanh Bình',
      status: 'Pending',
    });

    // 3. Đúng 0.5s (500ms) sau: chuyển sang trạng thái mới và hoàn thành
    setTimeout(async () => {
      try {
        const updated = await deviceService.updateDeviceStatus(id, newStatus);
        setDevices((prev) =>
          prev.map((d) => (d.id === id ? { ...d, status: updated.status } : d))
        );
        // Cập nhật trạng thái trong Action History từ Pending sang Success
        if (record) {
          record.status = 'Success';
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật thiết bị:', error);
        if (record) {
          record.status = 'Failed';
        }
      } finally {
        // Gỡ bỏ trạng thái pending sau khi hoàn tất
        setPendingDevices((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header Dashboard */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: '700',
            color: '#1e293b',
          }}
        >
          Dashboard
        </h1>

        {/* Trạng thái hệ thống */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13.5px',
            color: '#64748b',
          }}
        >
          <span>Hệ thống trực tuyến</span>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'inline-block',
            }}
          />
        </div>
      </div>

      {/* 2. Cụm 4 Biểu đồ (Ánh sáng, Nhiệt độ, Độ ẩm, Nồng độ CO2) dạng lưới 2x2 */}
      <RealtimeChart data={chartData} sensors={sensors} />

      {/* 3. Khu vực phía dưới: 2 cột (Dữ liệu cảm biến & Điều khiển đèn) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {/* Cột trái: Dữ liệu cảm biến */}
        <div>
          <h3
            style={{
              margin: '0 0 14px 0',
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b',
            }}
          >
            Dữ liệu cảm biến
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
            }}
          >
            <SensorCard
              type="Light"
              title="Ánh sáng (Light)"
              value={sensors?.light?.value ?? '720'}
              unit="lux"
            />
            <SensorCard
              type="Temperature"
              title="Nhiệt độ (Temperature)"
              value={sensors?.temperature?.value ?? '28.5'}
              unit="°C"
            />
            <SensorCard
              type="Humidity"
              title="Độ ẩm (Humidity)"
              value={sensors?.humidity?.value ?? '65'}
              unit="%"
            />
            <SensorCard
              type="CO2"
              title="Nồng độ CO₂"
              value={sensors?.co2?.value ?? '450'}
              unit="ppm"
              subtext="Tự sinh ngẫu nhiên"
            />
          </div>
        </div>

        {/* Cột phải: Điều khiển đèn (4 đèn) */}
        <DeviceControl
          devices={devices}
          pendingDevices={pendingDevices}
          onToggleDevice={handleToggleDevice}
        />
      </div>
    </div>
  );
};

export default Dashboard;
