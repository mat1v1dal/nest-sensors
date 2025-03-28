// src/metrics/metrics.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMetricDto } from "./dto/create-metric.dto";
import { SensorsService } from "../sensors/sensors.service";

interface Metric extends CreateMetricDto {
    id: number;
}

@Injectable()
export class MetricsService {
    private metrics: Metric[] = [];

    constructor(private sensorsService: SensorsService) {}

    getAllMetrics(): Metric[] {
        return this.metrics;
    }

    getMetricById(id: number): Metric {
        const metric = this.metrics.find(metric => metric.id === id);
        if (!metric) {
            throw new NotFoundException(`Metric with ID ${id} not found.`);
        }
        return metric;
    }

    getMetricsBySensorId(sensorId: number): Metric[] {
        // Verify sensor exists
        this.sensorsService.getSensor(sensorId);
        
        // Return metrics for this sensor
        return this.metrics.filter(metric => metric.sensorId === sensorId);
    }

    addMetric(metricDto: CreateMetricDto): Metric {
        // Verify sensor exists
        this.sensorsService.getSensor(metricDto.sensorId);
        
        // Set timestamp if not provided
        if (!metricDto.timestamp) {
            metricDto.timestamp = new Date();
        }

        const newMetric: Metric = {
            ...metricDto,
            id: this.metrics.length + 1
        };
        
        this.metrics.push(newMetric);
        return newMetric;
    }

    deleteMetric(id: number): string {
        const index = this.metrics.findIndex(metric => metric.id === id);
        if (index === -1) {
            throw new NotFoundException(`Metric with ID ${id} not found.`);
        }
        
        this.metrics.splice(index, 1);
        return `Metric with ID ${id} deleted.`;
    }

    updateMetric(id: number, updateData: Partial<CreateMetricDto>): Metric {
        const metric = this.getMetricById(id);
        
        // If sensorId is being updated, verify the new sensor exists
        if (updateData.sensorId && updateData.sensorId !== metric.sensorId) {
            this.sensorsService.getSensor(updateData.sensorId);
        }
        
        const updatedMetric = { ...metric, ...updateData };
        
        // Update the metric in the array
        const index = this.metrics.findIndex(m => m.id === id);
        this.metrics[index] = updatedMetric;
        
        return updatedMetric;
    }

    getMetricsStatistics(sensorId: number) {
        const sensorMetrics = this.getMetricsBySensorId(sensorId);
        
        if (sensorMetrics.length === 0) {
            return {
                count: 0,
                min: null,
                max: null,
                avg: null
            };
        }

        // Group metrics by type
        const metricsByType = sensorMetrics.reduce((acc, metric) => {
            if (!acc[metric.metricType]) {
                acc[metric.metricType] = [];
            }
            acc[metric.metricType].push(metric);
            return acc;
        }, {} as Record<string, Metric[]>);

        // Calculate statistics for each type
        const statistics = Object.entries(metricsByType).map(([type, metrics]) => {
            const values = metrics.map(m => m.value);
            return {
                metricType: type,
                count: metrics.length,
                min: Math.min(...values),
                max: Math.max(...values),
                avg: values.reduce((sum, val) => sum + val, 0) / values.length,
                unit: metrics[0].unit
            };
        });

        return statistics;
    }
}