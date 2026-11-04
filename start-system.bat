@echo off
title IoT System Launcher
echo ========================================================
echo DANG KHOI CHAY HE THONG IOT...
echo ========================================================

echo 1. Khoi dong Mosquitto MQTT Broker (Port 8888)...
start "Mosquitto Broker (8888)" cmd /c "run-mosquitto.bat"

timeout /t 2 >nul

echo 2. Khoi dong Spring Boot Backend (Port 8080)...
start "Spring Boot Backend (8080)" cmd /c "run-backend.bat"

echo ========================================================
echo Backend va Broker da duoc bat trong cac cua so rieng!
echo ========================================================
pause

