-- ========================================================
-- KỊCH BẢN KHỞI TẠO CƠ SỞ DỮ LIỆU IOT_SYSTEM (CẬP NHẬT AUTH)
-- Đề tài: Hệ thống IoT giám sát môi trường và điều khiển thiết bị
-- Sinh viên: Nguyễn Thanh Bình - MSV: B23DCCN084
-- ========================================================

CREATE DATABASE IF NOT EXISTS iot_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE iot_system;

-- 1. Bảng lưu trữ tài khoản người dùng và xác thực JWT
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) DEFAULT 'Nguyễn Thanh Bình',
    role VARCHAR(20) DEFAULT 'ROLE_USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng lưu trữ dữ liệu đo từ cảm biến (Nhiệt độ, Độ ẩm, Ánh sáng)
CREATE TABLE IF NOT EXISTS sensor_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    light INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng quản lý trạng thái các thiết bị ngoại vi (Đèn 1, Đèn 2)
CREATE TABLE IF NOT EXISTS devices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    type VARCHAR(50) DEFAULT 'light',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Khởi tạo dữ liệu ban đầu cho 2 thiết bị đèn
INSERT INTO devices (id, name, status, type) 
VALUES 
    (1, 'Đèn 1', FALSE, 'light'), 
    (2, 'Đèn 2', FALSE, 'light')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 4. Bảng nhật ký lịch sử thao tác điều khiển thiết bị
CREATE TABLE IF NOT EXISTS action_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    device VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    operator VARCHAR(100) DEFAULT 'Nguyễn Thanh Bình',
    status VARCHAR(20) DEFAULT 'Pending', -- 'Success', 'Pending', 'Failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

