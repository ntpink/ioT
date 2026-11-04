package com.iot.backend.controller;

import com.iot.backend.dto.DeviceStatusRequest;
import com.iot.backend.entity.Device;
import com.iot.backend.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    /**
     * Lấy danh sách thiết bị
     * GET /api/v1/devices
     */
    @GetMapping
    public List<Device> getDevices() {
        return deviceService.getDevices();
    }

    /**
     * Bật/Tắt thiết bị
     * PUT /api/v1/devices/{id}/status
     * Body: { "status": true }
     */
    @PutMapping("/{id}/status")
    public Device updateDeviceStatus(
            @PathVariable Integer id,
            @RequestBody DeviceStatusRequest request,
            @RequestParam(defaultValue = "Nguyễn Thanh Bình") String operator) {
        return deviceService.updateDeviceStatus(id, request.getStatus() != null && request.getStatus(), operator);
    }
}

