import { Test, TestingModule } from '@nestjs/testing';
import { TrainScheduleService } from './train-schedule.service';

describe('TrainScheduleService', () => {
  let service: TrainScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainScheduleService],
    }).compile();

    service = module.get<TrainScheduleService>(TrainScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
