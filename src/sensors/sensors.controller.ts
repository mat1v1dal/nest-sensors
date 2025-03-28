import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';

@Controller({})
export class SensorsController {

    sensorsService: SensorsService;
    constructor(sensorsService: SensorsService){
        this.sensorsService = sensorsService;
    }


    @Get('/get-sensors/:id')
    getAllSensors(@Param('id') id: string): any{
        return this.sensorsService.getSensor(parseInt(id));
    }

    @Post('/add-sensor')
    @UsePipes(new ValidationPipe())
    addSensor(@Body() sensor: CreateSensorDto){
        return this.sensorsService.addSensor(sensor);
    }

    @Post('/delete-sensor')
    deleteSensor(){
        return "eliminando sensor";
    }

    @Patch('/update-sensor')
    updateSensorStatus(){
        return "actualizando sensor";
    }

}
