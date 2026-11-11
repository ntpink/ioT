/**
 * Tiện ích định dạng thời gian cho hệ thống IoT:
 * Định dạng: Năm-Tháng-Ngày Giờ:Phút:Giây (YYYY-MM-DD HH:mm:ss)
 * Ví dụ: 2026-10-14 10:30:02
 * Thứ tự này hỗ trợ tìm kiếm linh hoạt:
 * - Tìm chính xác: 2026-10-14 10:30:02
 * - Xóa giây: 2026-10-14 10:30
 * - Xóa phút & giây: 2026-10-14 10
 * - Xóa giờ: 2026-10-14
 * - Xóa ngày: 2026-10
 * - Xóa cả ngày & tháng: 2026
 * - Chỉ tìm theo giờ/phút: 10:30
 */
export const formatDateTime = (val) => {
  if (!val) return '--';
  const str = String(val).trim();

  // 1. Nếu đã đúng định dạng YYYY-MM-DD HH:mm:ss thì giữ nguyên
  if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}$/.test(str)) {
    return str;
  }

  // 2. Chuyển đổi từ định dạng YYYY/MM/DD HH:mm:ss sang YYYY-MM-DD HH:mm:ss
  if (/^\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}:\d{2}$/.test(str)) {
    return str.replace(/\//g, '-');
  }

  // 3. Chuyển đổi từ định dạng dd/MM/yyyy HH:mm:ss sang YYYY-MM-DD HH:mm:ss
  const dmyMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{2}:\d{2}:\d{2})$/);
  if (dmyMatch) {
    const [, day, month, year, time] = dmyMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}`;
  }

  // 4. Chuyển đổi từ định dạng cũ: HH:mm:ss MM/dd/yyyy sang YYYY-MM-DD HH:mm:ss
  const oldFormatMatch = str.match(/^(\d{2}:\d{2}:\d{2})\s+(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (oldFormatMatch) {
    const [, time, month, day, year] = oldFormatMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${time}`;
  }

  // 5. Nếu là chuỗi ISO hoặc Date hợp lệ (vd: 2026-11-04T14:58:13 hoặc timestamp)
  const parsedDate = new Date(str);
  if (!isNaN(parsedDate.getTime())) {
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return str;
};

export default formatDateTime;
