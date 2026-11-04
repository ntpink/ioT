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
    time: '10:30:02 10/14/2026',
  },
  {
    id: '002',
    device: 'Light 2',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '10:30:04 10/14/2026',
  },
  {
    id: '003',
    device: 'Fan 1',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '10:30:06 10/14/2026',
  },
  {
    id: '004',
    device: 'Light 1',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '10:31:10 10/14/2026',
  },
  {
    id: '005',
    device: 'Light 1',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Failed',
    time: '10:31:10 10/14/2026',
  },
  {
    id: '006',
    device: 'Fan 2',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Pending',
    time: '10:31:15 10/14/2026',
  },
  {
    id: '007',
    device: 'Light 2',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '10:32:20 10/14/2026',
  },
  {
    id: '008',
    device: 'Fan 1',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Pending',
    time: '10:33:05 10/14/2026',
  },
  {
    id: '009',
    device: 'Light 1',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Failed',
    time: '10:34:10 10/14/2026',
  },
  {
    id: '010',
    device: 'Fan 2',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '10:35:12 10/14/2026',
  },
];
