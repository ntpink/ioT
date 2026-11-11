@echo off
title Spring Boot Backend (Port 8080)
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "MAVEN_CMD=C:\Users\admin\.m2\wrapper\dists\apache-maven-3.8.4-bin\52ccbt68d252mdldqsfsn03jlf\apache-maven-3.8.4\bin\mvn.cmd"

echo ========================================================
echo KIEM TRA VA KHOI DONG DICH VU MYSQL...
echo ========================================================
net start MySQL80 >nul 2>&1
net start MySQL >nul 2>&1

cd /d "%~dp0backend"
echo ========================================================
echo DANG KHOI DONG SPRING BOOT BACKEND O CONG 8080...
echo ========================================================
"%MAVEN_CMD%" spring-boot:run
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================================
    echo [CANH BAO] Backend bi dung hoac thoat loi!
    echo Nguyen nhan pho bien nhat: Dich vu MySQL chua duoc bat (Port 3306).
    echo HUONG DAN XU LY NHANH:
    echo 1. Nhan to hop phim Windows + R, go: services.msc va an Enter.
    echo 2. Tim dich vu co ten "MySQL80" (hoac "MySQL"), chuot phai chon "Start".
    echo 3. Sau do chay lai file run-backend.bat nay!
    echo ========================================================
    echo.
)
pause
