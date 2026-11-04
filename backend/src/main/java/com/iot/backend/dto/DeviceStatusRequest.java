package com.iot.backend.dto;

public class DeviceStatusRequest {
    private Boolean status;

    public DeviceStatusRequest() {}

    public DeviceStatusRequest(Boolean status) {
        this.status = status;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}

