import React, { useState } from 'react';
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

// Tooltip hiển thị chi tiết khi rê chuột vào từng chấm
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
          fontSize: '12px',
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '4px',
            borderBottom: '1px solid #f1f5f9',
            paddingBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>🕒 Thời gian:</span>
          <span style={{ color: '#0284c7' }}>{label}</span>
        </div>
        {payload.map((item, index) => {
          const unit =
            item.dataKey === 'temperature'
              ? '°C'
              : item.dataKey === 'humidity'
              ? '%'
              : 'lux';
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                marginTop: '3px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#475569',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    display: 'inline-block',
                  }}
                />
                <span>{item.name}:</span>
              </div>
              <span style={{ fontWeight: '600', color: item.color }}>
                {item.value} {unit}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export const RealtimeChart = ({ data = [] }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [viewMode, setViewMode] = useState('separate'); // 'separate' | 'combined'

  const handleChartClick = (state) => {
    if (state && state.activePayload && state.activePayload.length) {
      setSelectedPoint(state.activePayload[0].payload);
    }
  };

  return (
    <Card style={{ padding: '20px 24px', flex: 2 }}>
      {/* Chart Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: '700',
            color: '#1e293b',
          }}
        >
          Biểu đồ theo dõi (Realtime Monitoring)
        </h3>

        {/* Cụm điều khiển chế độ xem & chú giải */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Nút chuyển chế độ xem */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#f1f5f9',
              borderRadius: '6px',
              padding: '2px',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('separate')}
              style={{
                border: 'none',
                backgroundColor: viewMode === 'separate' ? '#ffffff' : 'transparent',
                color: viewMode === 'separate' ? '#0f172a' : '#64748b',
                fontWeight: viewMode === 'separate' ? '600' : '400',
                fontSize: '11.5px',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: viewMode === 'separate' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              3 Trục riêng biệt
            </button>
            <button
              type="button"
              onClick={() => setViewMode('combined')}
              style={{
                border: 'none',
                backgroundColor: viewMode === 'combined' ? '#ffffff' : 'transparent',
                color: viewMode === 'combined' ? '#0f172a' : '#64748b',
                fontWeight: viewMode === 'combined' ? '600' : '400',
                fontSize: '11.5px',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: viewMode === 'combined' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Gộp 1 biểu đồ
            </button>
          </div>

          {/* Chú giải màu sắc */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              color: '#64748b',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '3px', backgroundColor: '#ef4444', borderRadius: '2px', display: 'inline-block' }} />
              <span>Nhiệt độ (°C)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '3px', backgroundColor: '#3b82f6', borderRadius: '2px', display: 'inline-block' }} />
              <span>Độ ẩm (%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '3px', backgroundColor: '#f59e0b', borderRadius: '2px', display: 'inline-block' }} />
              <span>Ánh sáng (lux)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin điểm được chọn khi nhấp vào chấm trên đường */}
      {selectedPoint && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '6px',
            padding: '6px 12px',
            marginBottom: '12px',
            fontSize: '12.5px',
            color: '#0369a1',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span>
              <strong>📍 Lúc:</strong>{' '}
              <span style={{ color: '#0284c7', fontWeight: '600' }}>
                {selectedPoint.time}
              </span>
            </span>
            <span>🔴 <strong>Nhiệt độ:</strong> {selectedPoint.temperature} °C</span>
            <span>🔵 <strong>Độ ẩm:</strong> {selectedPoint.humidity} %</span>
            <span>🟡 <strong>Ánh sáng:</strong> {selectedPoint.light} lux</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPoint(null)}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#0284c7',
              fontWeight: '600',
              fontSize: '13px',
              marginLeft: '8px',
              padding: '0 4px',
            }}
            title="Đóng chi tiết"
          >
            ✕
          </button>
        </div>
      )}

      {/* CHẾ ĐỘ 1: 3 TRỤC RIÊNG BIỆT - CHUNG 1 TRỤC THỜI GIAN (Mặc định) */}
      {viewMode === 'separate' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* 1. Track Nhiệt độ (Trục dọc 0 - 50 °C) */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: '600',
                color: '#ef4444',
                paddingLeft: '14px',
                marginBottom: '1px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
              Nhiệt độ (°C)
            </div>
            <div style={{ width: '100%', height: '82px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  syncId="realtimeSensorsSync"
                  data={data}
                  onClick={handleChartClick}
                  margin={{ top: 4, right: 20, left: 14, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={1} />
                  <XAxis dataKey="time" hide />
                  <YAxis
                    domain={[0, 50]}
                    ticks={[0, 25, 50]}
                    tick={{ fill: '#ef4444', fontSize: 10.5, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                    width={52}
                    unit=" °C"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    name="Nhiệt độ"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 3, stroke: '#ef4444', strokeWidth: 1.5, fill: '#ffffff' }}
                    activeDot={{ r: 5, stroke: '#ef4444', strokeWidth: 2, fill: '#ffffff', cursor: 'pointer' }}
                    isAnimationActive={true}
                    animationDuration={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Track Độ ẩm (Trục dọc 0 - 100 %) */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: '600',
                color: '#3b82f6',
                paddingLeft: '14px',
                marginBottom: '1px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6', display: 'inline-block' }} />
              Độ ẩm (%)
            </div>
            <div style={{ width: '100%', height: '82px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  syncId="realtimeSensorsSync"
                  data={data}
                  onClick={handleChartClick}
                  margin={{ top: 4, right: 20, left: 14, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={1} />
                  <XAxis dataKey="time" hide />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 50, 100]}
                    tick={{ fill: '#3b82f6', fontSize: 10.5, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                    width={52}
                    unit=" %"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    name="Độ ẩm"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3, stroke: '#3b82f6', strokeWidth: 1.5, fill: '#ffffff' }}
                    activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff', cursor: 'pointer' }}
                    isAnimationActive={true}
                    animationDuration={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Track Ánh sáng (Trục dọc 0 - 1000 lux) + Trục thời gian chung ở đáy */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: '600',
                color: '#f59e0b',
                paddingLeft: '14px',
                marginBottom: '1px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
              Ánh sáng (lux)
            </div>
            <div style={{ width: '100%', height: '106px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  syncId="realtimeSensorsSync"
                  data={data}
                  onClick={handleChartClick}
                  margin={{ top: 4, right: 20, left: 14, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={1} />
                  {/* Trục hoành thời gian chung cho cả 3 đồ thị */}
                  <XAxis
                    dataKey="time"
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                    dy={6}
                  />
                  <YAxis
                    domain={[0, 1000]}
                    ticks={[0, 500, 1000]}
                    tick={{ fill: '#f59e0b', fontSize: 10.5, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                    width={52}
                    unit=" lx"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="light"
                    name="Ánh sáng"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 3, stroke: '#f59e0b', strokeWidth: 1.5, fill: '#ffffff' }}
                    activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 2, fill: '#ffffff', cursor: 'pointer' }}
                    isAnimationActive={true}
                    animationDuration={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        /* CHẾ ĐỘ 2: GỘP CHUNG 1 BIỂU ĐỒ */
        <div style={{ width: '100%', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              onClick={handleChartClick}
              margin={{ top: 10, right: 30, left: 14, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#f1f5f9" strokeWidth={1.5} />
              <XAxis
                dataKey="time"
                axisLine={{ stroke: '#f1f5f9', strokeWidth: 1.5 }}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11.5 }}
                dy={10}
              />
              {/* Trục bên trái cho Nhiệt độ & Độ ẩm (0 - 100) */}
              <YAxis
                yAxisId="left"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 11 }}
                ticks={[0, 25, 50, 75, 100]}
                width={50}
                unit="%"
              />
              {/* Trục bên phải cho Ánh sáng (0 - 1000 lux) */}
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 1000]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#f59e0b', fontSize: 11 }}
                ticks={[0, 250, 500, 750, 1000]}
                width={55}
                unit=" lx"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                name="Nhiệt độ"
                stroke="#ef4444"
                strokeWidth={2.2}
                dot={{ r: 3.5, stroke: '#ef4444', strokeWidth: 1.5, fill: '#ffffff' }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: '#ffffff', cursor: 'pointer' }}
                isAnimationActive={true}
                animationDuration={600}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="humidity"
                name="Độ ẩm"
                stroke="#3b82f6"
                strokeWidth={2.2}
                dot={{ r: 3.5, stroke: '#3b82f6', strokeWidth: 1.5, fill: '#ffffff' }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff', cursor: 'pointer' }}
                isAnimationActive={true}
                animationDuration={600}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="light"
                name="Ánh sáng"
                stroke="#f59e0b"
                strokeWidth={2.2}
                dot={{ r: 3.5, stroke: '#f59e0b', strokeWidth: 1.5, fill: '#ffffff' }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#ffffff', cursor: 'pointer' }}
                isAnimationActive={true}
                animationDuration={600}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

export default RealtimeChart;
