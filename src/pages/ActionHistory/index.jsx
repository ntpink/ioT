import React, { useState, useEffect } from 'react';
import HistoryFilter from '../../components/history/HistoryFilter';
import HistoryTable from '../../components/history/HistoryTable';
import actionHistoryService from '../../services/actionHistoryService';

const DEFAULT_FILTERS = {
  device: 'All Devices',
  action: 'All Actions',
  status: 'All Status',
  time: '',
};

export const ActionHistory = () => {
  // Bộ lọc đang chỉnh sửa trong form (chưa kích hoạt tìm kiếm)
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  // Bộ lọc đã được áp dụng sau khi bấm nút "Tìm kiếm"
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => {
    const saved = localStorage.getItem('action_page_size');
    const parsed = parseInt(saved, 10);
    return [5, 10, 15, 20].includes(parsed) ? parsed : 5;
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await actionHistoryService.getHistory({
        page,
        pageSize,
        device: appliedFilters.device,
        action: appliedFilters.action,
        status: appliedFilters.status,
        time: appliedFilters.time,
      });
      setData(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error('Lỗi khi tải lịch sử thao tác:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chỉ tải lại dữ liệu khi đổi trang, đổi số hàng, hoặc khi đã bấm nút "Tìm kiếm" / "Xóa lọc"
  useEffect(() => {
    fetchHistory();
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
    localStorage.setItem('action_page_size', newSize);
    setPage(1); 
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
          Action History
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

      {/* Thanh bộ lọc và tìm kiếm */}
      <HistoryFilter
        filters={draftFilters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* Bảng Action History */}
      <HistoryTable
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

export default ActionHistory;
