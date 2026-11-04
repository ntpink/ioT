/**
 * FILE: Table.jsx
 * CÔNG DỤNG: Component bảng dữ liệu tổng quát (Generic Table).
 * - Nhận vào mảng cột (columns) và mảng dữ liệu (data).
 * - Hàng tiêu đề nền xám #f8fafc, viền phân cách mờ giữa các hàng.
 * - Hỗ trợ thanh cuộn ngang (overflowX) nếu màn hình nhỏ.
 */
import React from 'react';

export const Table = ({ columns = [], data = [], keyExtractor, renderRow }) => {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'center',
          fontSize: '13.5px',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f8fafc',
              color: '#334155',
              fontWeight: '600',
              height: '46px',
            }}
          >
            {columns.map((col, index) => (
              <th
                key={col.key || index}
                style={{
                  padding: '12px 16px',
                  fontWeight: '600',
                  color: '#334155',
                  textAlign: col.align || 'center',
                  width: col.width || 'auto',
                  borderTopLeftRadius: index === 0 ? '8px' : '0',
                  borderBottomLeftRadius: index === 0 ? '8px' : '0',
                  borderTopRightRadius: index === columns.length - 1 ? '8px' : '0',
                  borderBottomRightRadius: index === columns.length - 1 ? '8px' : '0',
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => {
            if (renderRow) {
              return renderRow(item, rowIndex);
            }
            return (
              <tr
                key={keyExtractor ? keyExtractor(item) : item.id || rowIndex}
                style={{
                  borderBottom: '1px solid #f1f5f9',
                  height: '52px',
                  color: '#1e293b',
                  transition: 'background-color 0.15s',
                }}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key || colIndex}
                    style={{
                      padding: '12px 16px',
                      textAlign: col.align || 'center',
                    }}
                  >
                    {col.render ? col.render(item[col.dataIndex], item) : item[col.dataIndex]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

