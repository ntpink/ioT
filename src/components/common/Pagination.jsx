/**
 * FILE: Pagination.jsx
 * CÔNG DỤNG: Cụm phân trang chuẩn: [Hiển thị dòng] ... [Rows: 5 ▼] [Đầu] [Trước] [1] [2] [Sau] [Cuối]
 * - Bên trái: Hiển thị thông tin dòng (ví dụ: "Hiển thị 1-5 trên tổng số 16 dòng").
 * - Bên phải:
 *   + Ô chọn số hàng: "Rows: 5 ▼" (cho phép chọn các mốc: 5, 10, 15, 20 dòng/trang).
 *   + Nút "Đầu", nút "Trước", các nút số trang [1], [2]..., nút "Sau", nút "Cuối".
 * - Tự động disable khi ở đầu/cuối trang.
 */
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 15, 20],
  showPageSize = true,
  customInfoText,
  maxPages = 2,
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const infoText =
    customInfoText || `Hiển thị ${startItem}-${endItem} trên tổng số ${totalItems} dòng`;

  const validTotalPages = Math.max(totalPages, 1);
  const effectiveTotalPages = Math.min(validTotalPages, maxPages);
  const pages = Array.from({ length: effectiveTotalPages }, (_, idx) => idx + 1);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
        paddingTop: '8px',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Thông tin số dòng hiển thị */}
      <span
        style={{
          fontSize: '13px',
          color: '#64748b',
          fontWeight: '400',
        }}
      >
        {infoText}
      </span>

      {/* Cụm điều khiển bên phải: [Rows: 5 ▼] [Đầu] [Trước] [1] [2] [Sau] [Cuối] */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginLeft: 'auto',
          flexShrink: 0,
        }}
      >
        {/* Dropdown chọn số hàng: Rows: 5 ▼ */}
        {showPageSize && (
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '0 10px',
              height: '32px',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                color: '#334155',
                fontWeight: '500',
                marginRight: '6px',
                userSelect: 'none',
              }}
            >
              Rows:{' '}
              <span style={{ fontWeight: '400', color: '#475569' }}>
                {pageSize}
              </span>
            </span>
            <ChevronDown size={14} color="#64748b" />
            <select
              value={pageSize}
              onChange={(e) =>
                onPageSizeChange && onPageSizeChange(Number(e.target.value))
              }
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                appearance: 'none',
              }}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  Rows: {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nút về trang đầu: Đầu */}
        <button
          type="button"
          className="pagination-btn pagination-btn-text"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(1)}
          aria-label="Trang đầu"
        >
          Đầu
        </button>

        {/* Nút lùi trang: Trước */}
        <button
          type="button"
          className="pagination-btn pagination-btn-text"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          aria-label="Trang trước"
        >
          Trước
        </button>

        {/* Các nút số trang: [1] [2]... */}
        {pages.map((pageNum) => {
          const isActive = currentPage === pageNum;
          return (
            <button
              key={pageNum}
              type="button"
              className={`pagination-btn ${isActive ? 'active' : ''}`}
              onClick={() => onPageChange && onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Nút tiến trang: Sau */}
        <button
          type="button"
          className="pagination-btn pagination-btn-text"
          disabled={currentPage >= effectiveTotalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          aria-label="Trang sau"
        >
          Sau
        </button>

        {/* Nút đến trang cuối: Cuối */}
        <button
          type="button"
          className="pagination-btn pagination-btn-text"
          disabled={currentPage >= effectiveTotalPages}
          onClick={() => onPageChange && onPageChange(effectiveTotalPages)}
          aria-label="Trang cuối"
        >
          Cuối
        </button>
      </div>
    </div>
  );
};

export default Pagination;
