$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$maven = "C:\Users\admin\.m2\wrapper\dists\apache-maven-3.8.4-bin\52ccbt68d252mdldqsfsn03jlf\apache-maven-3.8.4\bin\mvn.cmd"

Set-Location $PSScriptRoot
Write-Host "-> Dang khoi dong Spring Boot Backend tren cong 8080..." -ForegroundColor Cyan
& $maven spring-boot:run

