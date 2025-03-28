import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSensorDto } from "./dto/create-sensor.dto";

interface Sensor extends CreateSensorDto {
    id: number;
}

export class SensorsService{

    private sensors: Sensor[] = [];

    getSensor(id: number){
        const sensor = this.sensors.find(sensor => sensor.id === id);
        if (!sensor) {
            return new NotFoundException(`Sensor with ID ${id} not found.`);
        }
        return sensor;
    }

    addSensor(sensor: CreateSensorDto) {
        this.sensors.push({
            ...sensor,
            id: this.sensors.length + 1
        })
    }

    deleteSensor(sensorId: number) {
        return `Sensor with ID ${sensorId} deleted.`;
    }

    updateSensorStatus(sensorId: number, status: string) {
        return `Sensor with ID ${sensorId} updated to status ${status}.`;
    }

}