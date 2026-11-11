@echo off
title IoT System Launcher
cd /d "%~dp0"
echo ========================================================
echo DANG KHOI CHAY TOAN BO HE THONG IOT...
echo ========================================================

echo 1. Khoi dong Mosquitto MQTT Broker (Port 8888)...
start "Mosquitto Broker (8888)" cmd /k "run-mosquitto.bat"

timeout /t 2 >nul

echo 2. Khoi dong Spring Boot Backend (Port 8080)...
start "Spring Boot Backend (8080)" cmd /k "run-backend.bat"

timeout /t 3 >nul

echo 3. Khoi dong React Frontend (Port 5173)...
start "React Frontend (5173)" cmd /k "npm run dev"

echo ========================================================
echo He thong da duoc khoi dong trong cac cua so rieng:
echo - Mosquitto Broker: tcp://localhost:8888
echo - Backend:          http://localhost:8080
echo - Frontend:         http://localhost:5173
echo ========================================================
pause
