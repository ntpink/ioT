# 🌐 Hệ Thống IoT Giám Sát Môi Trường & Điều Khiển Thiết Bị

> **Đồ án môn học / Dự án IoT Smart Home**  
> **Sinh viên thực hiện:** Nguyễn Thanh Bình  
> **Mã sinh viên:** B23DCCN084  
> **GitHub:** [ntpink](https://github.com/ntpink)  

---

## 📌 1. Giới thiệu tổng quan
Hệ thống IoT hoàn chỉnh kết nối từ thiết bị phần cứng vi điều khiển (Hardware), máy chủ truyền thông thời gian thực (MQTT Broker), máy chủ phụ trợ (Backend RESTful API & SSE), cơ sở dữ liệu quan hệ (MySQL) đến ứng dụng Web giao diện người dùng (Frontend):
* **Giám sát môi trường thời gian thực:** Thu thập các thông số Nhiệt độ (°C), Độ ẩm (%) và Ánh sáng (lux) từ cảm biến mỗi 2 giây, cập nhật trực tiếp lên Dashboard qua biểu đồ và thẻ thông số.
* **Điều khiển thiết bị ngoại vi:** Điều khiển bật/tắt Đèn 1 và Đèn 2 từ xa qua giao thức MQTT với phản hồi xác nhận hai chiều (ACK).
* **Tra cứu và quản lý:** Tìm kiếm, lọc và phân trang dữ liệu cảm biến (*Data Sensor*) và lịch sử thao tác điều khiển (*Action History*).

---

## 🛠️ 2. Công nghệ sử dụng

| Tầng | Công nghệ / Thư viện | Mô tả |
| :--- | :--- | :--- |
| **Phần cứng (Hardware)** | ESP8266 NodeMCU V3, DHT11, LDR, 2x LED | Đọc cảm biến, xuất tín hiệu GPIO, kết nối WiFi & MQTT |
| **Giao thức truyền thông** | Eclipse Mosquitto MQTT (Port 8888) | Broker xử lý các topic `sensor_data`, `device_control`, `device_response` |
| **Máy chủ phụ trợ (Backend)** | Java 17, Spring Boot 3, Spring Data JPA, Eclipse Paho MQTT | Cung cấp RESTful API, Server-Sent Events (SSE), ghi nhận CSDL |
| **Cơ sở dữ liệu (Database)** | MySQL 8.0 | Lưu trữ 3 bảng `sensor_data`, `devices`, `action_history` |
| **Giao diện người dùng (Frontend)** | React, Vite, Recharts, Lucide Icons | Dashboard thời gian thực, bảng tra cứu, bộ lọc động, phân trang |

---

## 📁 3. Cấu trúc thư mục dự án

```text
ioT/
├── backend/                       # Mã nguồn Java Spring Boot 3 Backend
│   ├── src/main/java/com/iot/backend/
│   │   ├── config/                # Cấu hình CORS
│   │   ├── controller/            # REST Controllers (Sensor, Device, ActionHistory)
│   │   ├── dto/                   # Data Transfer Objects
│   │   ├── entity/                # JPA Entities (SensorData, Device, ActionHistory)
│   │   ├── repository/            # Spring Data JPA Repositories
│   │   └── service/               # Nghiệp vụ & Xử lý MQTT (MqttService, SensorService...)
│   ├── src/main/resources/        # application.properties
│   ├── pom.xml                    # Cấu hình Maven Dependencies
│   └── run-backend.bat            # Script khởi động nhanh Backend
├── database/
│   └── schema.sql                 # Kịch bản khởi tạo CSDL MySQL
├── hardware/
│   └── esp8266_firmware.ino       # Mã nguồn nhúng nạp cho ESP8266
├── src/                           # Mã nguồn React Frontend
│   ├── components/                # Common, Dashboard, History, Sensor, Profile
│   ├── pages/                     # Dashboard, DataSensor, ActionHistory, Profile
│   ├── services/                  # Gọi API Backend & kết nối SSE
│   └── App.jsx
├── run-mosquitto.bat              # Script khởi động nhanh Mosquitto Broker
├── run-backend.bat                # Script khởi động Backend từ thư mục gốc
├── start-system.bat               # Script khởi động cả Broker & Backend 1-click
├── package.json                   # Cấu hình dependencies Frontend
└── vite.config.js                 # Cấu hình Vite & Proxy
```

---

## 🚀 4. Hướng dẫn cài đặt và khởi chạy

### Bước 1: Khởi tạo Cơ sở dữ liệu
* Mở **MySQL Workbench** và chạy toàn bộ nội dung file [`database/schema.sql`](./database/schema.sql) để tạo database `iot_system` và các bảng ban đầu.

### Bước 2: Khởi động Mosquitto MQTT Broker (Port 8888)
* Nhấp đúp vào file `run-mosquitto.bat` (hoặc mở terminal chạy: `"C:\Program Files\mosquitto\mosquitto.exe" -c "C:\Program Files\mosquitto\mosquitto.conf" -v`).

### Bước 3: Khởi động Spring Boot Backend (Port 8080)
* Nhấp đúp vào file `run-backend.bat` (hoặc vào thư mục `backend/` gõ `mvn spring-boot:run`).
* Server sẽ khởi chạy tại: `http://localhost:8080`.

### Bước 4: Khởi động React Frontend (Port 5173)
* Mở terminal tại thư mục gốc và chạy:
  ```cmd
  npm install
  npm run dev
  ```
* Mở trình duyệt tại: `http://localhost:5173`.

### Bước 5: Nạp code phần cứng ESP8266
* Mở file [`hardware/esp8266_firmware.ino`](./hardware/esp8266_firmware.ino) bằng Arduino IDE.
* Cấu hình WiFi và địa chỉ IP Broker, sau đó nạp code lên mạch vi điều khiển ESP8266.
