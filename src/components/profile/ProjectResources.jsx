/**
 * FILE: ProjectResources.jsx
 * CÔNG DỤNG: Thẻ hiển thị danh sách tài nguyên dự án trên trang Profile.
 * - Danh sách 4 mục: Github, Figma, Postman, Báo Cáo.
 * - Mỗi mục có nút "Open" (Button variant="outline").
 * - Khi click nút "Open", mở liên kết url tương ứng trong tab mới.
 */
import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

export const ProjectResources = ({ resources = [] }) => {
  const handleOpenLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card style={{ padding: '24px 32px' }}>
      <h3
        style={{
          margin: '0 0 18px 0',
          fontSize: '15px',
          fontWeight: '700',
          color: '#1e293b',
        }}
      >
        Project resources
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {resources.map((res, index) => (
          <div
            key={res.id || index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderTop: index === 0 ? 'none' : '1px solid #f1f5f9',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                color: '#334155',
                fontWeight: '500',
              }}
            >
              {res.name}
            </span>

            <Button
              variant="outline"
              onClick={() => handleOpenLink(res.url)}
              style={{
                padding: '5px 18px',
                fontSize: '13px',
                borderRadius: '8px',
              }}
            >
              Open
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectResources;

