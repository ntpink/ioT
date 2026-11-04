import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import StatusBadge from '../common/StatusBadge';
import Pagination from '../common/Pagination';
import CopyButton from '../common/CopyButton';

export const HistoryTable = ({
  records = [],
  total = 0,
  page = 1,
  pageSize = 5,
  onPageChange,
  onPageSizeChange,
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '9%',
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      align: 'center',
      width: '16%',
      render: (val) => <span style={{ fontWeight: '600' }}>{val}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Người điều khiển',
      dataIndex: 'operator',
      key: 'operator',
      align: 'center',
      width: '22%',
      render: (val) => (
        <span style={{ fontWeight: '500', color: '#334155' }}>
          {val || 'Nguyễn Thanh Bình'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '14%',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: '24%',
      render: (val) => (
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{val}</span>
          <CopyButton text={val} />
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(total / (pageSize || 5)) || 1;

  return (
    <Card style={{ padding: '20px 24px' }}>
      <Table columns={columns} data={records} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={total}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </Card>
  );
};

export default HistoryTable;
