package com.iot.backend.dto;

public class SensorRecordDto {
    private String id;
    private String sensorType;
    private String value;
    private String time;

    public SensorRecordDto() {}

    public SensorRecordDto(String id, String sensorType, String value, String time) {
        this.id = id;
        this.sensorType = sensorType;
        this.value = value;
        this.time = time;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSensorType() { return sensorType; }
    public void setSensorType(String sensorType) { this.sensorType = sensorType; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
}

