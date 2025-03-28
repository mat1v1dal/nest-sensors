import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorsModule } from './sensors/sensors.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [SensorsModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
