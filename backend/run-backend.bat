@echo off
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "MAVEN_CMD=C:\Users\admin\.m2\wrapper\dists\apache-maven-3.8.4-bin\52ccbt68d252mdldqsfsn03jlf\apache-maven-3.8.4\bin\mvn.cmd"

cd /d "%~dp0"
echo Starting Spring Boot Backend on Port 8080...
"%MAVEN_CMD%" spring-boot:run
pause
