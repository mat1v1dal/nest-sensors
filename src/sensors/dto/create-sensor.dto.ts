import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNumber, IsOptional, IsString, Min, Max, IsObject } from 'class-validator';

export class CreateSensorDto {

    @ApiProperty({ example: 'SN12345678', description: 'Número de serie del sensor' })
    @IsString()
    serial: string;

    @ApiProperty({ example: 'X200', description: 'Modelo del sensor' })
    @IsString()
    model: string;

    @ApiProperty({ example: 'Temperature', description: 'Tipo de sensor' })
    @IsString()
    type: string;

    @ApiProperty({ example: true, description: 'Estado del sensor (activo o inactivo)' })
    @IsBoolean()
    isActive: boolean;

    @ApiPropertyOptional({ example: { threshold: 25, unit: 'Celsius' }, description: 'Configuración opcional del sensor' })
    @IsOptional()
    @IsObject()
    configuration?: Record<string, any>;

    @ApiPropertyOptional({ example: '1.2.3', description: 'Versión del firmware' })
    @IsOptional()
    @IsString()
    firmwareVersion?: string;

    @ApiPropertyOptional({ example: 85, description: 'Nivel de batería en porcentaje' })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(100)
    batteryLevel?: number;

    @ApiPropertyOptional({ example: 60, description: 'Intervalo de medición en segundos' })
    @IsOptional()
    @IsInt()
    @Min(1)
    measurementIterval?: number;

    @ApiPropertyOptional({ example: 'Warehouse A', description: 'Ubicación del sensor' })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional({ example: '2025-03-28T10:30:00Z', description: 'Fecha de creación' })
    @IsOptional()
    @IsString()
    createdAt?: Date;

    @ApiPropertyOptional({ example: '2025-03-28T12:00:00Z', description: 'Fecha de última actualización' })
    @IsOptional()
    @IsString()
    updatedAt?: Date;

    @ApiPropertyOptional({ example: '2025-03-15T08:00:00Z', description: 'Última fecha de mantenimiento' })
    @IsOptional()
    @IsString()
    lastMaintenance?: Date;

    @ApiPropertyOptional({ example: '2025-06-15T08:00:00Z', description: 'Próxima fecha de mantenimiento' })
    @IsOptional()
    @IsString()
    nextMaintenance?: Date;
}
