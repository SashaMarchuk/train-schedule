import { Module } from '@nestjs/common';
import { TrainScheduleService } from './train-schedule.service';
import { TrainScheduleController } from './train-schedule.controller';
import {UsersController} from "../users/users.controller";
import {UsersService} from "../users/users.service";
import {PrismaModule} from "../prisma/prisma.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [TrainScheduleController],
  providers: [TrainScheduleService],
  imports: [PrismaModule],
  exports: [TrainScheduleService]
})
export class TrainScheduleModule {}
