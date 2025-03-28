// src/metrics/dto/create-metric.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsNumber, IsOptional, IsString, Min, Max, IsObject, IsUUID } from 'class-validator';

export class CreateMetricDto {
    @ApiProperty({ example: 1, description: 'ID del sensor asociado a esta métrica' })
    @IsInt()
    sensorId: number;

    @ApiProperty({ example: 'temperature', description: 'Tipo de métrica' })
    @IsString()
    metricType: string;

    @ApiProperty({ example: 25.4, description: 'Valor de la métrica' })
    @IsNumber()
    value: number;

    @ApiProperty({ example: 'Celsius', description: 'Unidad de medida' })
    @IsString()
    unit: string;

    @ApiPropertyOptional({ example: '2025-03-28T10:30:00Z', description: 'Fecha y hora de la medición' })
    @IsOptional()
    @IsString()
    timestamp?: Date;

    @ApiPropertyOptional({ example: { min: 20, max: 30 }, description: 'Rango normal para esta métrica' })
    @IsOptional()
    @IsObject()
    normalRange?: Record<string, any>;

    @ApiPropertyOptional({ example: 'high', description: 'Estado de la alerta (normal, warning, critical)' })
    @IsOptional()
    @IsString()
    alertStatus?: string;

    @ApiPropertyOptional({ example: 'Warehouse A - Zone 3', description: 'Ubicación específica de la medición' })
    @IsOptional()
    @IsString()
    locationDetail?: string;

    @ApiPropertyOptional({ example: { humidity: 65, pressure: 1013 }, description: 'Datos adicionales relacionados' })
    @IsOptional()
    @IsObject()
    additionalData?: Record<string, any>;

    @ApiPropertyOptional({ example: 'Measurement taken during maintenance', description: 'Notas adicionales' })
    @IsOptional()
    @IsString()
    notes?: string;
}