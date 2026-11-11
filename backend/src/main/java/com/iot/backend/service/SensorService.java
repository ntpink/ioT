package com.iot.backend.service;

import com.iot.backend.dto.ChartPointDto;
import com.iot.backend.dto.PaginatedResponse;
import com.iot.backend.dto.RealtimeSensorsResponse;
import com.iot.backend.dto.SensorRecordDto;
import com.iot.backend.entity.SensorData;
import com.iot.backend.repository.SensorDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SensorService {

    @Autowired
    private SensorDataRepository sensorDataRepository;

    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    private final DateTimeFormatter tableDateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    // Danh sách các kết nối Web Frontend đang lắng nghe trực tiếp luồng SSE
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    /**
     * Nhận số đo từ ESP8266 qua MQTT -> Lưu vào MySQL -> Bắn tin realtime lên Frontend
     */
    public SensorData saveSensorData(Float temperature, Float humidity, Integer light) {
        SensorData entity = new SensorData(temperature, humidity, light);
        SensorData saved = sensorDataRepository.save(entity);
        System.out.println("-> [MYSQL ĐÃ LƯU] ID: " + saved.getId() + 
                           " | Temp: " + temperature + "°C | Hum: " + humidity + "% | Light: " + light + " lux");

        // Phát tín hiệu cập nhật thời gian thực ngay lập tức tới Frontend
        broadcastRealtimeUpdate();
        return saved;
    }

    /**
     * Lấy dữ liệu 3 thẻ cảm biến hiện tại cho Dashboard
     */
    public RealtimeSensorsResponse getRealtimeSensors() {
        Optional<SensorData> latestOpt = sensorDataRepository.findTopByOrderByIdDesc();
        float temp = 0.0f;
        float hum = 0.0f;
        int light = 0;

        if (latestOpt.isPresent()) {
            SensorData data = latestOpt.get();
            temp = data.getTemperature();
            hum = data.getHumidity();
            light = data.getLight();
        }

        RealtimeSensorsResponse.SensorCardDto tempCard = new RealtimeSensorsResponse.SensorCardDto(
                "temp_01", "Nhiệt độ (Temperature)", temp, "°C", "Temperature"
        );
        RealtimeSensorsResponse.SensorCardDto humCard = new RealtimeSensorsResponse.SensorCardDto(
                "hum_01", "Độ ẩm (Humidity)", hum, "%", "Humidity"
        );
        RealtimeSensorsResponse.SensorCardDto lightCard = new RealtimeSensorsResponse.SensorCardDto(
                "light_01", "Ánh sáng (Light)", light, "lux", "Light"
        );

        return new RealtimeSensorsResponse(tempCard, humCard, lightCard);
    }

    /**
     * Lấy 6-10 điểm đo gần nhất cho Biểu đồ (Sắp xếp theo thứ tự thời gian tăng dần từ cũ đến mới)
     */
    public List<ChartPointDto> getChartData() {
        List<SensorData> list = sensorDataRepository.findTop6ByOrderByIdDesc();
        List<ChartPointDto> result = new ArrayList<>();

        // Đảo ngược danh sách để điểm cũ nhất ở đầu, điểm mới nhất ở cuối
        for (int i = list.size() - 1; i >= 0; i--) {
            SensorData s = list.get(i);
            String timeStr = s.getCreatedAt() != null ? s.getCreatedAt().format(timeFormatter) : "00:00:00";
            result.add(new ChartPointDto(timeStr, s.getTemperature(), s.getHumidity(), s.getLight()));
        }

        return result;
    }

    /**
     * Lấy danh sách lịch sử cảm biến cho bảng Data Sensor có lọc và phân trang
     */
    public PaginatedResponse<SensorRecordDto> getSensors(int page, int pageSize, String type, String valueQuery, String timeQuery) {
        PageRequest pageRequest = PageRequest.of(Math.max(0, page - 1), pageSize);
        Page<SensorData> sensorPage = sensorDataRepository.searchSensors(timeQuery, pageRequest);

        List<SensorRecordDto> records = new ArrayList<>();
        long recordCounter = (long) (Math.max(0, page - 1) * pageSize) + 1;

        for (SensorData s : sensorPage.getContent()) {
            String timeFormatted = s.getCreatedAt() != null ? s.getCreatedAt().format(tableDateFormatter) : "";

            // Kiểm tra theo loại cảm biến được chọn
            if (type == null || type.isEmpty() || "All Sensors".equalsIgnoreCase(type) || "All".equalsIgnoreCase(type)) {
                // Thêm bản ghi Nhiệt độ
                addRecordIfMatches(records, String.format("%03d", recordCounter++), "Temperature", s.getTemperature() + " °C", timeFormatted, valueQuery);
                // Thêm bản ghi Độ ẩm
                addRecordIfMatches(records, String.format("%03d", recordCounter++), "Humidity", s.getHumidity() + " %", timeFormatted, valueQuery);
                // Thêm bản ghi Ánh sáng
                addRecordIfMatches(records, String.format("%03d", recordCounter++), "Light", s.getLight() + " lux", timeFormatted, valueQuery);
            } else if ("Temperature".equalsIgnoreCase(type)) {
                addRecordIfMatches(records, String.format("%03d", recordCounter++), "Temperature", s.getTemperature() + " °C", timeFormatted, valueQuery);
            } else if ("Humidity".equalsIgnoreCase(type)) {
                addRecordIfMatches(records, String.format("%03d", recordCounter++), "Humidity", s.getHumidity() + " %", timeFormatted, valueQuery);
            } else if ("Light".equalsIgnoreCase(type)) {
                addRecordIfMatches(records, String.format("%03d", recordCounter++), "Light", s.getLight() + " lux", timeFormatted, valueQuery);
            }
        }

        long totalElements = sensorPage.getTotalElements();
        if (type == null || type.isEmpty() || "All Sensors".equalsIgnoreCase(type) || "All".equalsIgnoreCase(type)) {
            totalElements *= 3; // Vì 1 bản ghi gốc chứa cả 3 cảm biến
        }

        return new PaginatedResponse<>(records, totalElements, page, pageSize);
    }

    private void addRecordIfMatches(List<SensorRecordDto> list, String id, String type, String val, String time, String valueQuery) {
        if (valueQuery != null && !valueQuery.trim().isEmpty()) {
            if (!val.toLowerCase().contains(valueQuery.trim().toLowerCase())) {
                return;
            }
        }
        list.add(new SensorRecordDto(id, type, val, time));
    }

    /**
     * Đăng ký nhận luồng Server-Sent Events (SSE) cho Dashboard
     */
    public SseEmitter subscribeSse() {
        SseEmitter emitter = new SseEmitter(0L); // Không timeout
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        // Gửi ngay trạng thái ban đầu khi client kết nối
        try {
            Map<String, Object> initialData = new HashMap<>();
            initialData.put("sensors", getRealtimeSensors());
            initialData.put("chartData", getChartData());
            emitter.send(SseEmitter.event().name("sensor_update").data(initialData));
        } catch (IOException e) {
            emitters.remove(emitter);
        }

        return emitter;
    }

    /**
     * Bắn dữ liệu mới nhất tới tất cả các trình duyệt đang mở Dashboard
     */
    public void broadcastRealtimeUpdate() {
        if (emitters.isEmpty()) return;

        Map<String, Object> payload = new HashMap<>();
        payload.put("sensors", getRealtimeSensors());
        payload.put("chartData", getChartData());

        List<SseEmitter> deadEmitters = new ArrayList<>();
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("sensor_update").data(payload));
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        }
        emitters.removeAll(deadEmitters);
    }
}

