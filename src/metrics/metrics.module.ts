// src/metrics/metrics.module.ts
import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { SensorsModule } from '../sensors/sensors.module';
import { SensorsService } from 'src/sensors/sensors.service';

@Module({
  imports: [SensorsModule],
  controllers: [MetricsController],
  providers: [MetricsService, SensorsService],
  exports: [MetricsService]
})
export class MetricsModule {}