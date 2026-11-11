/**
 * FILE: src/mock/actionHistoryData.js
 * CÔNG DỤNG: Dữ liệu mẫu (Mock data) cho bảng Lịch sử hoạt động (Action History).
 * - Các trường: id, device, action, operator (Người điều khiển), status (Success, Pending, Failed), time.
 */
export const actionHistoryMock = [
  {
    id: '001',
    device: 'Đèn 1',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '2026-10-14 10:30:02',
  },
  {
    id: '002',
    device: 'Đèn 2',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '2026-10-14 10:30:04',
  },
  {
    id: '003',
    device: 'Đèn 3',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '2026-10-14 10:30:06',
  },
  {
    id: '004',
    device: 'Đèn 4',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '2026-10-14 10:31:10',
  },
  {
    id: '005',
    device: 'Đèn 1',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Failed',
    time: '2026-10-14 10:31:10',
  },
  {
    id: '006',
    device: 'Đèn 3',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Pending',
    time: '2026-10-14 10:31:15',
  },
  {
    id: '007',
    device: 'Đèn 2',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '2026-10-14 10:32:20',
  },
  {
    id: '008',
    device: 'Đèn 4',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Pending',
    time: '2026-10-14 10:33:05',
  },
  {
    id: '009',
    device: 'Đèn 1',
    action: 'Turn ON',
    operator: 'Nguyễn Thanh Bình',
    status: 'Failed',
    time: '2026-10-14 10:34:10',
  },
  {
    id: '010',
    device: 'Đèn 3',
    action: 'Turn OFF',
    operator: 'Nguyễn Thanh Bình',
    status: 'Success',
    time: '2026-10-14 10:35:12',
  },
];
