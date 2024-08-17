import { Test, TestingModule } from '@nestjs/testing';
import { DeedsController } from './deeds.controller';

describe('DeedsController', () => {
  let controller: DeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeedsController],
    }).compile();

    controller = module.get<DeedsController>(DeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
