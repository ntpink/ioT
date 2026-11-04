/**
 * FILE: src/mock/actionHistoryData.js
 * CÔNG DỤNG: Dữ liệu mẫu (Mock data) cho bảng Lịch sử hoạt động (Action History).
 * - Các trường: id, device, action, operator (Người điều khiển), status (Success, Pending, Failed), time.
 */
export const actionHistoryMock = [
  {
    id: '001',
    device: 'Light 1',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '14/10/2026 10:30:02',
  },
  {
    id: '002',
    device: 'Light 2',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '14/10/2026 10:30:04',
  },
  {
    id: '003',
    device: 'Fan 1',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '14/10/2026 10:30:06',
  },
  {
    id: '004',
    device: 'Light 1',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '14/10/2026 10:31:10',
  },
  {
    id: '005',
    device: 'Light 1',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Failed',
    time: '14/10/2026 10:31:10',
  },
  {
    id: '006',
    device: 'Fan 2',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Pending',
    time: '14/10/2026 10:31:15',
  },
  {
    id: '007',
    device: 'Light 2',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '14/10/2026 10:32:20',
  },
  {
    id: '008',
    device: 'Fan 1',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Pending',
    time: '14/10/2026 10:33:05',
  },
  {
    id: '009',
    device: 'Light 1',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Failed',
    time: '14/10/2026 10:34:10',
  },
  {
    id: '010',
    device: 'Fan 2',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '14/10/2026 10:35:12',
  },
];
