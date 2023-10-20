import { Test, TestingModule } from '@nestjs/testing';
import { TrainScheduleController } from './train-schedule.controller';
import { TrainScheduleService } from './train-schedule.service';

describe('TrainScheduleController', () => {
  let controller: TrainScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainScheduleController],
      providers: [TrainScheduleService],
    }).compile();

    controller = module.get<TrainScheduleController>(TrainScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
