import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {TrainScheduleService} from './train-schedule.service';
import {CreateTrainScheduleDto} from './dto/create-train-schedule.dto';
import {UpdateTrainScheduleDto} from './dto/update-train-schedule.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiBearerAuth, ApiOkResponse} from "@nestjs/swagger";
import {TrainScheduleEntity} from "./entities/train-schedule.entity";

@Controller('train-schedule')
export class TrainScheduleController {
    constructor(private readonly trainScheduleService: TrainScheduleService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: TrainScheduleEntity})
    create(@Body() createTrainScheduleDto: CreateTrainScheduleDto) {
        return this.trainScheduleService.create(createTrainScheduleDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: TrainScheduleEntity, isArray: true})
    findAll() {
        console.log('this.trainScheduleService.findAll(): ', this.trainScheduleService.findAll());
        return this.trainScheduleService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: TrainScheduleEntity})
    findOne(@Param('id') id: string) {
        return this.trainScheduleService.findOne(+id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: TrainScheduleEntity, isArray: true})
    async findAllByUser(@Param('userId') userId: string) {
        return await this.trainScheduleService.findAllByUser(+userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: TrainScheduleEntity})
    update(@Param('id') id: string, @Body() updateTrainScheduleDto: UpdateTrainScheduleDto) {
        return this.trainScheduleService.update(+id, updateTrainScheduleDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({type: TrainScheduleEntity})
    remove(@Param('id') id: string) {
        return this.trainScheduleService.remove(+id);
    }
}
