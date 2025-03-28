import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { Metrics } from './metrics.service';

@Module({
  controllers: [MetricsController],
  providers: [Metrics]
})
export class MetricsModule {}
