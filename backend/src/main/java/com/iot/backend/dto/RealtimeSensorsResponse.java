package com.iot.backend.dto;

public class RealtimeSensorsResponse {

    private SensorCardDto temperature;
    private SensorCardDto humidity;
    private SensorCardDto light;
    private SensorCardDto co2;

    public RealtimeSensorsResponse() {}

    public RealtimeSensorsResponse(SensorCardDto temperature, SensorCardDto humidity, SensorCardDto light) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
    }

    public RealtimeSensorsResponse(SensorCardDto temperature, SensorCardDto humidity, SensorCardDto light, SensorCardDto co2) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
        this.co2 = co2;
    }

    public static class SensorCardDto {
        private String id;
        private String name;
        private Object value;
        private String unit;
        private String type;

        public SensorCardDto() {}

        public SensorCardDto(String id, String name, Object value, String unit, String type) {
            this.id = id;
            this.name = name;
            this.value = value;
            this.unit = unit;
            this.type = type;
        }

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Object getValue() { return value; }
        public void setValue(Object value) { this.value = value; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }

    public SensorCardDto getTemperature() { return temperature; }
    public void setTemperature(SensorCardDto temperature) { this.temperature = temperature; }
    public SensorCardDto getHumidity() { return humidity; }
    public void setHumidity(SensorCardDto humidity) { this.humidity = humidity; }
    public SensorCardDto getLight() { return light; }
    public void setLight(SensorCardDto light) { this.light = light; }
    public SensorCardDto getCo2() { return co2; }
    public void setCo2(SensorCardDto co2) { this.co2 = co2; }
}

