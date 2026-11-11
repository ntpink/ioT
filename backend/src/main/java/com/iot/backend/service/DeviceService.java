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
        if (list.size() < 4) {
            for (int i = 1; i <= 4; i++) {
                final int devId = i;
                if (deviceRepository.findById(devId).isEmpty()) {
                    deviceRepository.save(new Device(devId, "Đèn " + devId, false, "light"));
                }
            }
            list = deviceRepository.findAllByOrderByIdAsc();
        }

        // ĐỒNG BỘ TRẠNG THÁI CUỐI CÙNG TỪ ACTION_HISTORY:
        // Đảm bảo khi người dùng reload trang (F5) thì trạng thái luôn phản ánh chính xác dữ liệu thao tác cuối cùng
        for (Device device : list) {
            try {
                String devName = "Đèn " + device.getId();
                Optional<ActionHistory> latestAction = actionHistoryRepository.findLatestByDevice(devName);
                if (latestAction.isPresent()) {
                    String act = latestAction.get().getAction();
                    if (act != null) {
                        boolean isOn = act.toUpperCase().contains("ON") || act.toUpperCase().contains("BẬT");
                        if (device.getStatus() == null || device.getStatus() != isOn) {
                            device.setStatus(isOn);
                            deviceRepository.save(device);
                        }
                    }
                }
            } catch (Exception e) {
                // Giữ nguyên trạng thái hiện tại trong database nếu xảy ra lỗi truy vấn
            }
        }

        return list;
    }

    /**
     * Nhận lệnh bật/tắt từ React Web -> Gửi MQTT xuống ESP8266 -> Lưu Action History
     */
    public Device updateDeviceStatus(Integer id, Boolean status, String operator) {
        Device device = deviceRepository.findById(id).orElseGet(() -> new Device(id, "Đèn " + id, status, "light"));
        device.setStatus(status);
        Device updated = deviceRepository.save(device);

        // Chuẩn hóa tên thiết bị để lưu Action History: Đèn 1, Đèn 2, Đèn 3, Đèn 4
        String deviceName = "Đèn " + id;
        String actionStr = status ? "Turn ON" : "Turn OFF";

        // Tạo bản ghi lịch sử với trạng thái "Success" để lưu dữ liệu cuối
        ActionHistory history = new ActionHistory(
                deviceName,
                actionStr,
                operator != null && !operator.trim().isEmpty() ? operator : "Nguyễn Thanh Bình",
                "Success"
        );
        actionHistoryRepository.save(history);

        // Tạo lệnh MQTT cho 4 đèn
        String mqttCommand;
        if (id == 1) {
            mqttCommand = status ? "LED1_ON" : "LED1_OFF";
        } else if (id == 2) {
            mqttCommand = status ? "LED2_ON" : "LED2_OFF";
        } else if (id == 3) {
            mqttCommand = status ? "LED3_ON" : "LED3_OFF";
        } else if (id == 4) {
            mqttCommand = status ? "LED4_ON" : "LED4_OFF";
        } else {
            mqttCommand = status ? "LED_ON" : "LED_OFF";
        }

        // Bắn lệnh qua MQTT Broker xuống ESP8266
        boolean sent = mqttService.publishControl(mqttCommand);
        System.out.println("-> [ĐIỀU KHIỂN] Thiết bị ID=" + id + " -> Lệnh: " + mqttCommand + " (Gửi MQTT: " + (sent ? "Thành công" : "Thất bại") + ")");

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
                // Đồng bộ lại trạng thái 4 LED trong database nếu có phản hồi
                if (json.has("led1")) {
                    boolean led1 = "ON".equalsIgnoreCase(json.get("led1").asText());
                    deviceRepository.findById(1).ifPresent(d -> { d.setStatus(led1); deviceRepository.save(d); });
                }
                if (json.has("led2")) {
                    boolean led2 = "ON".equalsIgnoreCase(json.get("led2").asText());
                    deviceRepository.findById(2).ifPresent(d -> { d.setStatus(led2); deviceRepository.save(d); });
                }
                if (json.has("led3")) {
                    boolean led3 = "ON".equalsIgnoreCase(json.get("led3").asText());
                    deviceRepository.findById(3).ifPresent(d -> { d.setStatus(led3); deviceRepository.save(d); });
                }
                if (json.has("led4")) {
                    boolean led4 = "ON".equalsIgnoreCase(json.get("led4").asText());
                    deviceRepository.findById(4).ifPresent(d -> { d.setStatus(led4); deviceRepository.save(d); });
                }
            }
        } catch (Exception e) {
            System.err.println("-> [LỖI XỬ LÝ PHẢN HỒI]: " + e.getMessage());
        }
    }
}

