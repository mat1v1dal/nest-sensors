// src/metrics/metrics.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todas las métricas o filtrar por ID del sensor' })
    @ApiQuery({ name: 'sensorId', required: false, description: 'Filtrar métricas por ID del sensor' })
    @ApiResponse({ status: 200, description: 'Devuelve todas las métricas o métricas para un sensor específico' })
    getAllMetrics(@Query('sensorId') sensorId?: string): any {
        if (sensorId) {
            return this.metricsService.getMetricsBySensorId(parseInt(sensorId));
        }
        return this.metricsService.getAllMetrics();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una métrica por ID' })
    @ApiParam({ name: 'id', description: 'ID de la métrica' })
    @ApiResponse({ status: 200, description: 'Devuelve la métrica' })
    @ApiResponse({ status: 404, description: 'Métrica no encontrada' })
    getMetricById(@Param('id') id: string): any {
        return this.metricsService.getMetricById(parseInt(id));
    }

    @Get('sensor/:sensorId/statistics')
    @ApiOperation({ summary: 'Obtener estadísticas de las métricas de un sensor' })
    @ApiParam({ name: 'sensorId', description: 'ID del sensor' })
    @ApiResponse({ status: 200, description: 'Devuelve estadísticas de las métricas del sensor' })
    @ApiResponse({ status: 404, description: 'Sensor no encontrado' })
    getMetricsStatistics(@Param('sensorId') sensorId: string) {
        return this.metricsService.getMetricsStatistics(parseInt(sensorId));
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva métrica' })
    @ApiResponse({ status: 201, description: 'La métrica ha sido creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Entrada inválida' })
    @ApiResponse({ status: 404, description: 'Sensor no encontrado' })
    @UsePipes(new ValidationPipe())
    addMetric(@Body() metricDto: CreateMetricDto): any {
        return this.metricsService.addMetric(metricDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una métrica' })
    @ApiParam({ name: 'id', description: 'ID de la métrica' })
    @ApiResponse({ status: 200, description: 'La métrica ha sido eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'Métrica no encontrada' })
    deleteMetric(@Param('id') id: string) {
        return this.metricsService.deleteMetric(parseInt(id));
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una métrica' })
    @ApiParam({ name: 'id', description: 'ID de la métrica' })
    @ApiResponse({ status: 200, description: 'La métrica ha sido actualizada exitosamente' })
    @ApiResponse({ status: 404, description: 'Métrica no encontrada' })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateMetric(@Param('id') id: string, @Body() updateData: Partial<CreateMetricDto>): any {
        return this.metricsService.updateMetric(parseInt(id), updateData);
    }
}