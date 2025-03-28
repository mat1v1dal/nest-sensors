import { Controller } from '@nestjs/common';
import { Metrics } from './metrics.service';

@Controller('metrics')
export class MetricsController {
    constructor(private metricsServide: Metrics) {}
}
