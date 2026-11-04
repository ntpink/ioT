/**
 * Tiện ích định dạng thời gian cho hệ thống IoT:
 * Định dạng: Ngày Tháng Năm trước, rồi mới đến Giờ Phút Giây (dd/MM/yyyy HH:mm:ss)
 */
export const formatDateTime = (val) => {
  if (!val) return '--';
  const str = String(val).trim();

  // 1. Nếu đã đúng định dạng dd/MM/yyyy HH:mm:ss thì giữ nguyên
  if (/^\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2}$/.test(str)) {
    return str;
  }

  // 2. Chuyển đổi từ định dạng cũ: HH:mm:ss MM/dd/yyyy sang dd/MM/yyyy HH:mm:ss
  const oldFormatMatch = str.match(/^(\d{2}:\d{2}:\d{2})\s+(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (oldFormatMatch) {
    const [, time, month, day, year] = oldFormatMatch;
    const formattedDay = day.padStart(2, '0');
    const formattedMonth = month.padStart(2, '0');
    return `${formattedDay}/${formattedMonth}/${year} ${time}`;
  }

  // 3. Nếu là chuỗi ISO hoặc Date hợp lệ (vd: 2026-11-04T14:58:13 hoặc 2026-11-04 14:58:13)
  const parsedDate = new Date(str);
  if (!isNaN(parsedDate.getTime())) {
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  return str;
};

export default formatDateTime;
