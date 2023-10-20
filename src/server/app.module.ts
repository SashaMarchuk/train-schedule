import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TrainScheduleModule } from './train-schedule/train-schedule.module';
import { AuthModule } from './auth/auth.module';

ConfigModule.forRoot()

@Module({
  imports: [PrismaModule, UsersModule, TrainScheduleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
