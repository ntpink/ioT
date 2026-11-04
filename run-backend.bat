@echo off
title Spring Boot Backend (Port 8080)
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "MAVEN_CMD=C:\Users\admin\.m2\wrapper\dists\apache-maven-3.8.4-bin\52ccbt68d252mdldqsfsn03jlf\apache-maven-3.8.4\bin\mvn.cmd"

cd /d "%~dp0backend"
echo ========================================================
echo DANG KHOI DONG SPRING BOOT BACKEND O CONG 8080...
echo ========================================================
"%MAVEN_CMD%" spring-boot:run
pause

