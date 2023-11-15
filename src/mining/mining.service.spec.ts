import { Test, TestingModule } from '@nestjs/testing';
import { MiningService } from './mining.service';

describe('MiningService', () => {
  let service: MiningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiningService],
    }).compile();

    service = module.get<MiningService>(MiningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
