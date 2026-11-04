package com.iot.backend.dto;

public class ChartPointDto {
    private String time;
    private Float temperature;
    private Float humidity;
    private Integer light;

    public ChartPointDto() {}

    public ChartPointDto(String time, Float temperature, Float humidity, Integer light) {
        this.time = time;
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
    }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public Float getTemperature() { return temperature; }
    public void setTemperature(Float temperature) { this.temperature = temperature; }
    public Float getHumidity() { return humidity; }
    public void setHumidity(Float humidity) { this.humidity = humidity; }
    public Integer getLight() { return light; }
    public void setLight(Integer light) { this.light = light; }
}

