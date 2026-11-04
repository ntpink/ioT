package com.iot.backend.dto;

public class ActionHistoryDto {
    private String id;
    private String device;
    private String action;
    private String operator;
    private String status;
    private String time;

    public ActionHistoryDto() {}

    public ActionHistoryDto(String id, String device, String action, String operator, String status, String time) {
        this.id = id;
        this.device = device;
        this.action = action;
        this.operator = operator;
        this.status = status;
        this.time = time;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDevice() { return device; }
    public void setDevice(String device) { this.device = device; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}

