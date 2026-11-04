package com.iot.backend.controller;

import com.iot.backend.dto.ChartPointDto;
import com.iot.backend.dto.PaginatedResponse;
import com.iot.backend.dto.RealtimeSensorsResponse;
import com.iot.backend.dto.SensorRecordDto;
import com.iot.backend.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sensors")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    /**
     * 1. Lấy dữ liệu 3 thẻ cảm biến tức thời cho Dashboard
     * GET /api/v1/sensors/realtime
     */
    @GetMapping("/realtime")
    public RealtimeSensorsResponse getRealtimeSensors() {
        return sensorService.getRealtimeSensors();
    }

    /**
     * 2. Lấy 6 mốc dữ liệu gần nhất cho Biểu đồ
     * GET /api/v1/sensors/chart
     */
    @GetMapping("/chart")
    public List<ChartPointDto> getChartData() {
        return sensorService.getChartData();
    }

    /**
     * 3. Lấy danh sách lịch sử cảm biến cho bảng Data Sensor (có lọc và phân trang)
     * GET /api/v1/sensors?page=1&pageSize=5&type=...&value=...&time=...
     */
    @GetMapping
    public PaginatedResponse<SensorRecordDto> getSensors(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String value,
            @RequestParam(required = false) String time) {
        return sensorService.getSensors(page, pageSize, type, value, time);
    }

    /**
     * 4. Luồng Server-Sent Events (SSE) đẩy dữ liệu thời gian thực tự động lên React
     * GET /api/v1/sensors/stream
     */
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamRealtimeSensors() {
        return sensorService.subscribeSse();
    }
}

