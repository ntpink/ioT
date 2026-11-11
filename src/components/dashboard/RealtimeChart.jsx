/**
 * FILE: RealtimeChart.jsx
 * CÔNG DỤNG: Cụm 4 biểu đồ giám sát thời gian thực dạng lưới 2x2 theo đúng thiết kế:
 * 1. Ánh sáng (Light) - Màu vàng cam (#f59e0b)
 * 2. Nhiệt độ (Temperature) - Màu đỏ (#ef4444)
 * 3. Độ ẩm (Humidity) - Màu xanh lam (#3b82f6)
 * 4. Nồng độ CO2 (CO2) - Màu xanh lá (#10b981) - Dữ liệu tự sinh ngẫu nhiên
 */
import React from 'react';
import Card from '../common/Card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const SingleTooltip = ({ active, payload, label, unit, color }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '6px 10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          fontSize: '11.5px',
          zIndex: 100,
        }}
      >
        <div style={{ color: '#64748b', marginBottom: '2px' }}>
          🕒 {label}
        </div>
        <div style={{ fontWeight: '700', color: color }}>
          {payload[0].value} {unit}
        </div>
      </div>
    );
  }
  return null;
};

// Component thẻ biểu đồ con
const MiniChartCard = ({ title, unit, value, color, dataKey, data = [], domain = [0, 'auto'], emptyText }) => {
  const hasData = Array.isArray(data) && data.length > 0 && data.some(d => d[dataKey] !== undefined && d[dataKey] !== null);

  return (
    <Card
      style={{
        padding: '16px 20px',
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Thẻ biểu đồ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <div>
          <h4
            style={{
              margin: 0,
              fontSize: '15px',
              fontWeight: '700',
              color: '#1e293b',
            }}
          >
            {title}
          </h4>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
            {unit}
          </span>
        </div>

        <span
          style={{
            fontSize: '15.5px',
            fontWeight: '700',
            color: color,
          }}
        >
          {value !== undefined && value !== null && value !== '' ? `${value} ${unit}` : `— ${unit}`}
        </span>
      </div>

      {/* Vùng vẽ biểu đồ */}
      <div style={{ width: '100%', height: '120px', position: 'relative' }}>
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={1} />
              <XAxis
                dataKey="time"
                tick={{ fill: '#94a3b8', fontSize: 10.5 }}
                tickLine={false}
                axisLine={{ stroke: '#f1f5f9' }}
                dy={4}
              />
              <YAxis hide domain={domain} />
              <Tooltip content={<SingleTooltip unit={unit} color={color} />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2.2}
                dot={false}
                activeDot={{ r: 4.5, stroke: color, strokeWidth: 2, fill: '#ffffff', cursor: 'pointer' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              fontSize: '12.5px',
              fontStyle: 'italic',
            }}
          >
            {emptyText || `Chưa có dữ liệu ${title}`}
          </div>
        )}
      </div>
    </Card>
  );
};

export const RealtimeChart = ({ data = [], sensors = null }) => {
  // Lấy giá trị mới nhất của từng cảm biến
  const latestItem = data.length > 0 ? data[data.length - 1] : {};

  const currentLight = sensors?.light?.value ?? latestItem.light ?? '720';
  const currentTemp = sensors?.temperature?.value ?? latestItem.temperature ?? '28.5';
  const currentHum = sensors?.humidity?.value ?? latestItem.humidity ?? '65';
  const currentCo2 = sensors?.co2?.value ?? latestItem.co2 ?? '450';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
      }}
    >
      {/* 1. Biểu đồ Ánh sáng (Light - Vàng Cam) */}
      <MiniChartCard
        title="Ánh sáng"
        unit="lux"
        value={currentLight}
        color="#f59e0b"
        dataKey="light"
        data={data}
        domain={[0, 1000]}
      />

      {/* 2. Biểu đồ Nhiệt độ (Temperature - Đỏ) */}
      <MiniChartCard
        title="Nhiệt độ"
        unit="°C"
        value={currentTemp}
        color="#ef4444"
        dataKey="temperature"
        data={data}
        domain={[0, 50]}
      />

      {/* 3. Biểu đồ Độ ẩm (Humidity - Xanh lam) */}
      <MiniChartCard
        title="Độ ẩm"
        unit="%"
        value={currentHum}
        color="#3b82f6"
        dataKey="humidity"
        data={data}
        domain={[0, 100]}
      />

      {/* 4. Biểu đồ Nồng độ CO2 (CO2 - Xanh lá - Tự sinh ngẫu nhiên) */}
      <MiniChartCard
        title="Nồng độ CO₂"
        unit="ppm"
        value={currentCo2}
        color="#10b981"
        dataKey="co2"
        data={data}
        domain={[350, 900]}
        emptyText="Chưa có dữ liệu CO₂"
      />
    </div>
  );
};

export default RealtimeChart;
