package com.iot.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Service
public class MqttService implements MqttCallback {

    @Value("${mqtt.broker.url:tcp://localhost:8888}")
    private String brokerUrl;

    @Value("${mqtt.client.id:SpringBoot_Backend_Server}")
    private String clientId;

    @Value("${mqtt.username:binh}")
    private String username;

    @Value("${mqtt.password:b23dccn084}")
    private String password;

    @Value("${mqtt.topic.sensor:sensor_data}")
    private String topicSensor;

    @Value("${mqtt.topic.control:device_control}")
    private String topicControl;

    @Value("${mqtt.topic.response:device_response}")
    private String topicResponse;

    private MqttClient client;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    @Lazy
    private SensorService sensorService;

    @Autowired
    @Lazy
    private DeviceService deviceService;

    @PostConstruct
    public void init() {
        connect();
    }

    public synchronized void connect() {
        try {
            if (client != null && client.isConnected()) {
                return;
            }
            System.out.println("-> [MQTT] Đang kết nối tới Broker: " + brokerUrl + " ...");
            client = new MqttClient(brokerUrl, clientId + "_" + System.currentTimeMillis(), new MemoryPersistence());
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            options.setAutomaticReconnect(true);
            options.setConnectionTimeout(5);
            options.setKeepAliveInterval(20);

            if (username != null && !username.trim().isEmpty()) {
                options.setUserName(username);
                options.setPassword(password.toCharArray());
            }

            client.setCallback(this);
            client.connect(options);

            // Subscribe nhận dữ liệu cảm biến và phản hồi thiết bị
            client.subscribe(topicSensor, 0);
            client.subscribe(topicResponse, 0);

            System.out.println("-> [MQTT] Kết nối thành công! Đã Subscribe topics: " + topicSensor + ", " + topicResponse);
        } catch (MqttException e) {
            System.err.println("-> [MQTT LỖI] Chưa thể kết nối Mosquitto Broker (" + e.getMessage() + ").");
            System.err.println("-> [MQTT LƯU Ý] Hãy đảm bảo Mosquitto Broker đang chạy ở cổng 8888. Backend sẽ tự động kết nối lại khi Broker sẵn sàng.");
        }
    }

    @Override
    public void connectionLost(Throwable cause) {
        System.err.println("-> [MQTT] Mất kết nối tới Broker: " + (cause != null ? cause.getMessage() : "Unknown"));
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) {
        String payload = new String(message.getPayload()).trim();
        System.out.println("-> [MQTT NHẬN ĐƯỢC] [" + topic + "] : " + payload);

        try {
            if (topicSensor.equals(topic)) {
                // Định dạng JSON từ ESP8266: {"temp": 28.5, "hum": 65.0, "light": 720}
                JsonNode json = objectMapper.readTree(payload);
                Float temp = json.has("temp") ? (float) json.get("temp").asDouble() : null;
                Float hum = json.has("hum") ? (float) json.get("hum").asDouble() : null;
                Integer light = json.has("light") ? json.get("light").asInt() : null;

                if (temp != null && hum != null && light != null) {
                    sensorService.saveSensorData(temp, hum, light);
                }
            } else if (topicResponse.equals(topic)) {
                // Định dạng phản hồi ACK: {"status":"SUCCESS","led1":"ON","led2":"OFF"}
                deviceService.handleDeviceResponse(payload);
            }
        } catch (Exception e) {
            System.err.println("-> [MQTT LỖI XỬ LÝ PAYLOAD]: " + e.getMessage());
        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        // Gửi tin thành công
    }

    /**
     * Gửi lệnh điều khiển xuống ESP8266 qua topic device_control
     */
    public boolean publish(String topic, String payload) {
        try {
            if (client == null || !client.isConnected()) {
                connect();
            }
            if (client != null && client.isConnected()) {
                MqttMessage msg = new MqttMessage(payload.getBytes());
                msg.setQos(0);
                client.publish(topic, msg);
                System.out.println("-> [MQTT GỬI ĐI] [" + topic + "] : " + payload);
                return true;
            }
        } catch (MqttException e) {
            System.err.println("-> [MQTT LỖI GỬI LỆNH]: " + e.getMessage());
        }
        return false;
    }

    public boolean publishControl(String command) {
        return publish(topicControl, command);
    }

    @PreDestroy
    public void disconnect() {
        try {
            if (client != null && client.isConnected()) {
                client.disconnect();
                client.close();
            }
        } catch (Exception ignored) {}
    }
}

