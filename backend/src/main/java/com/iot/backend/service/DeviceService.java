package com.iot.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iot.backend.entity.ActionHistory;
import com.iot.backend.entity.Device;
import com.iot.backend.repository.ActionHistoryRepository;
import com.iot.backend.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ActionHistoryRepository actionHistoryRepository;

    @Autowired
    private MqttService mqttService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Device> getDevices() {
        List<Device> list = deviceRepository.findAllByOrderByIdAsc();
        if (list.isEmpty()) {
            deviceRepository.save(new Device(1, "Light 1", false, "light"));
            deviceRepository.save(new Device(2, "Light 2", false, "light"));
            list = deviceRepository.findAllByOrderByIdAsc();
        }
        return list;
    }

    /**
     * Nhận lệnh bật/tắt từ React Web -> Gửi MQTT xuống ESP8266 -> Lưu Action History
     */
    public Device updateDeviceStatus(Integer id, Boolean status, String operator) {
        Optional<Device> opt = deviceRepository.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("Không tìm thấy thiết bị với ID: " + id);
        }

        Device device = opt.get();
        device.setStatus(status);
        Device updated = deviceRepository.save(device);

        // Chuẩn hóa tên thiết bị để lưu Action History
        String deviceName = id == 1 ? "Light 1" : (id == 2 ? "Light 2" : device.getName());
        String actionStr = status ? "Turn ON" : "Turn OFF";

        // Tạo bản ghi lịch sử với trạng thái "Pending"
        ActionHistory history = new ActionHistory(
                deviceName,
                actionStr,
                operator != null && !operator.trim().isEmpty() ? operator : "Nguyễn Thanh Bình",
                "Pending"
        );
        actionHistoryRepository.save(history);

        // Tạo lệnh MQTT đúng chuẩn theo sketch_oct6a.ino
        String mqttCommand;
        if (id == 1) {
            mqttCommand = status ? "LED1_ON" : "LED1_OFF";
        } else if (id == 2) {
            mqttCommand = status ? "LED2_ON" : "LED2_OFF";
        } else {
            mqttCommand = status ? "LED_ON" : "LED_OFF";
        }

        // Bắn lệnh qua MQTT Broker xuống ESP8266
        boolean sent = mqttService.publishControl(mqttCommand);
        System.out.println("-> [ĐIỀU KHIỂN] Thiết bị ID=" + id + " -> Lệnh: " + mqttCommand + " (Gửi: " + (sent ? "Thành công" : "Thất bại") + ")");

        // Nếu gửi ngay lập tức thành công và không chờ ACK phản hồi, có thể tự động đổi sang Success
        if (sent) {
            history.setStatus("Success");
            actionHistoryRepository.save(history);
        } else {
            history.setStatus("Failed");
            actionHistoryRepository.save(history);
        }

        return updated;
    }

    /**
     * Xử lý phản hồi ACK từ ESP8266 qua topic device_response: {"status":"SUCCESS","led1":"ON","led2":"OFF"}
     */
    public void handleDeviceResponse(String payload) {
        try {
            JsonNode json = objectMapper.readTree(payload);
            String status = json.has("status") ? json.get("status").asText() : "";
            System.out.println("-> [ESP8266 PHẢN HỒI]: Trạng thái = " + status);

            if ("SUCCESS".equalsIgnoreCase(status)) {
                // Đồng bộ lại trạng thái LED 1 và LED 2 trong database nếu có
                if (json.has("led1")) {
                    boolean led1 = "ON".equalsIgnoreCase(json.get("led1").asText());
                    deviceRepository.findById(1).ifPresent(d -> { d.setStatus(led1); deviceRepository.save(d); });
                }
                if (json.has("led2")) {
                    boolean led2 = "ON".equalsIgnoreCase(json.get("led2").asText());
                    deviceRepository.findById(2).ifPresent(d -> { d.setStatus(led2); deviceRepository.save(d); });
                }
            }
        } catch (Exception e) {
            System.err.println("-> [LỖI XỬ LÝ PHẢN HỒI]: " + e.getMessage());
        }
    }
}

