import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTrainScheduleDto} from './dto/create-train-schedule.dto';
import {UpdateTrainScheduleDto} from './dto/update-train-schedule.dto';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class TrainScheduleService {
    constructor(private prisma: PrismaService) {
    }

    async create(createTrainScheduleDto: CreateTrainScheduleDto) {
        return this.prisma.trainSchedule.create({data: createTrainScheduleDto});
    }

    findAll() {
        return this.prisma.trainSchedule.findMany();
    }

    findAllByUser(userId: number) {
        return this.prisma.trainSchedule.findMany({
            where: {user_id: userId},
        });
    }

    findOne(schedule_id: number) {
        const schedule = this.prisma.trainSchedule.findUnique({where: {schedule_id}});
        if (!schedule) {
            throw new NotFoundException(`Train schedule with ID ${schedule_id} not found.`);
        }
        return schedule;
    }

    async update(schedule_id: number, updateTrainScheduleDto: UpdateTrainScheduleDto) {
        return this.prisma.trainSchedule.update({
            where: {schedule_id},
            data: updateTrainScheduleDto,
        });
    }

    async remove(schedule_id: number) {
        const schedule = await this.findOne(schedule_id); // Check if the schedule exists
        return this.prisma.trainSchedule.delete({where: {schedule_id}});
    }
}
