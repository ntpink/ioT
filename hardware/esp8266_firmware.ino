#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// 1. THÔNG TIN WIFI
const char* ssid = "binh";
const char* password = "12345678";

// 2. CẤU HÌNH MQTT BROKER (IP máy tính phát Hotspot và Port 8888)
const char* mqtt_server = "192.168.137.1";
const int   mqtt_port   = 8888;
const char* mqtt_user   = "binh";
const char* mqtt_pass   = "b23dccn084";

// 3. CẤU HÌNH TÊN TOPIC ĐÚNG CHUẨN THEO BẢNG THIẾT KẾ
const char* topic_sensor   = "sensor_data";      // [STT 1]
const char* topic_control  = "device_control";   // [STT 2]
const char* topic_response = "device_response";  // [STT 3]

// 4. CẤU HÌNH CHÂN PHẦN CỨNG
#define LED_YELL   D1
#define LED_RED    D2
#define DHTPIN     D4
#define DHTTYPE    DHT11

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;

// Hàm kết nối WiFi
void setup_wifi() {
  delay(10);
  Serial.println("\n--- DANG KHOI CHAY ESP8266 ---");
  Serial.println("Dang ket noi WiFi: " + String(ssid));
  
  WiFi.mode(WIFI_STA); 
  WiFi.disconnect();   
  delay(100);
  
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) { 
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi da ket noi!");
    Serial.println("IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\n[LOI] Khong ket noi duoc WiFi!");
  }
}

// Hàm nhận lệnh điều khiển từ topic device_control ([STT 2])
void callback(char* topic, byte* payload, unsigned int length) {
  String message = "";

  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  message.trim();

  Serial.println("[Device SUB] Nhan lenh: [" + message + "]");

  bool success = false;

  if (message == "LED_ON" || message == "ON") {
    digitalWrite(LED_YELL, HIGH);
    digitalWrite(LED_RED, HIGH);
    success = true;
  }
  else if (message == "LED_OFF" || message == "OFF") {
    digitalWrite(LED_YELL, LOW);
    digitalWrite(LED_RED, LOW);
    success = true;
  }
  else if (message == "LED1_ON") {
    digitalWrite(LED_YELL, HIGH);
    success = true;
  }
  else if (message == "LED1_OFF") {
    digitalWrite(LED_YELL, LOW);
    success = true;
  }
  else if (message == "LED2_ON") {
    digitalWrite(LED_RED, HIGH);
    success = true;
  }
  else if (message == "LED2_OFF") {
    digitalWrite(LED_RED, LOW);
    success = true;
  }
  else {
    success = false;
  }

  String statusLed1 = (digitalRead(LED_YELL) == HIGH) ? "ON" : "OFF";
  String statusLed2 = (digitalRead(LED_RED) == HIGH) ? "ON" : "OFF";

  String status = success ? "SUCCESS" : "FAIL";

  // Đã sửa lại cú pháp JSON phản hồi chuẩn xác
  String responsePayload = "{\"status\":\"" + status + "\",\"led1\":\"" + statusLed1 + "\",\"led2\":\"" + statusLed2 + "\"}";

  Serial.println("[Device PUB ACK] -> " + responsePayload);

  client.publish(topic_response, responsePayload.c_str());
}

// Hàm kết nối lại MQTT Broker (Đã tích hợp User & Pass)
void reconnect() {
  while (!client.connected()) {
    Serial.print("Dang ket noi MQTT Broker... ");
    String clientId = "ESP8266-Dat-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass)) {
      Serial.println("Thanh cong!");
      client.subscribe(topic_control); 
    } else {
      Serial.print("That bai, ma loi: ");
      Serial.print(client.state());
      Serial.println(" - Thu lai sau 5 giay");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_YELL, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  digitalWrite(LED_YELL, LOW);
  digitalWrite(LED_RED, LOW);
  
  dht.begin();
  setup_wifi();
  
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) return; 
  
  if (!client.connected()) {
    reconnect();
  }
  client.loop(); 

  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int lightValue = analogRead(A0); 
    // Ghi chú: Nếu mạch quang trở mắc theo kiểu che tối ADC tăng, 
    // Backend đã tự động tính (1023 - light) để trời sáng lux cao, che tối lux giảm.
    // Hoặc có thể đảo trực tiếp tại đây: int lightValue = 1023 - analogRead(A0); 

    if (!isnan(h) && !isnan(t)) {
      String payload = "{\"temp\":" + String(t, 1) + ", \"hum\":" + String(h, 1) + ", \"light\":" + String(lightValue) + "}";
      
      Serial.println("[Sensor PUB] -> " + payload);
      client.publish(topic_sensor, payload.c_str());
    } else {
      Serial.println("[LOI] Khong doc duoc cam bien DHT11!");
    }
  }
}