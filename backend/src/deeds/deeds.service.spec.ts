import { Test, TestingModule } from '@nestjs/testing';
import { DeedsService } from './deeds.service';

describe('DeedsService', () => {
  let service: DeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeedsService],
    }).compile();

    service = module.get<DeedsService>(DeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
