package com.iot.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  IoT Spring Boot Backend đã khởi động thành công!");
        System.out.println("  API Server: http://localhost:8080/api/v1");
        System.out.println("=================================================");
    }
}

