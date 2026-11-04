import React, { useState, useEffect } from 'react';
import SensorFilter from '../../components/sensor/SensorFilter';
import SensorTable from '../../components/sensor/SensorTable';
import sensorService from '../../services/sensorService';

const DEFAULT_FILTERS = {
  sensorType: 'All Sensors',
  value: '',
  time: '',
};

export const DataSensor = () => {
  // Bộ lọc đang chỉnh sửa trong form (chưa kích hoạt tìm kiếm)
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  // Bộ lọc đã được áp dụng sau khi bấm nút "Tìm kiếm"
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => {
    const saved = localStorage.getItem('sensor_page_size');
    const parsed = parseInt(saved, 10);
    return [5, 10, 15, 20].includes(parsed) ? parsed : 5;
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSensorData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const res = await sensorService.getSensors({
        page,
        pageSize,
        type: appliedFilters.sensorType,
        value: appliedFilters.value,
        time: appliedFilters.time,
      });
      setData(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu cảm biến:', error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Chỉ tải lại dữ liệu khi đổi trang, đổi số hàng, hoặc khi đã bấm nút "Tìm kiếm" / "Xóa lọc"
  useEffect(() => {
    fetchSensorData();
  }, [page, pageSize, appliedFilters]);

  // Khi người dùng chọn select hoặc gõ input: CHỈ LƯU VÀO FORM DRAFT, KHÔNG LỌC TỰ ĐỘNG
  const handleFilterChange = (key, value) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Khi bấm nút "Tìm kiếm" (hoặc Enter): áp dụng bộ lọc và quay về trang 1
  const handleSearch = () => {
    setAppliedFilters({ ...draftFilters });
    setPage(1);
  };

  // Khi bấm nút "Xóa lọc": hoàn nguyên về mặc định và tải lại
  const handleReset = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    localStorage.setItem('sensor_page_size', newSize);
    setPage(1); // Reset về trang 1 khi đổi số hàng
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
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
          Data Sensor
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

      {/* Bộ lọc và tìm kiếm cảm biến */}
      <SensorFilter
        filters={draftFilters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* Bảng dữ liệu cảm biến */}
      <SensorTable
        records={data}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default DataSensor;

