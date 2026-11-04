import React from 'react';
import Card from '../common/Card';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import CopyButton from '../common/CopyButton';
import formatDateTime from '../../utils/dateFormatter';

export const SensorTable = ({
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
      width: '12%',
    },
    {
      title: 'Sensor Type',
      dataIndex: 'sensorType',
      key: 'sensorType',
      align: 'center',
      width: '28%',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      width: '24%',
      render: (val) => <span style={{ fontWeight: '600' }}>{val}</span>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: '36%',
      render: (val) => {
        const formattedTime = formatDateTime(val);
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ whiteSpace: 'nowrap' }}>{formattedTime}</span>
            <CopyButton text={formattedTime} />
          </div>
        );
      },
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

export default SensorTable;
