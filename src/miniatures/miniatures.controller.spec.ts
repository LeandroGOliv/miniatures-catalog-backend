import { Test, TestingModule } from '@nestjs/testing';
import { MiniaturesController } from './miniatures.controller';
import { MiniaturesService } from './miniatures.service';

describe('MiniaturesController', () => {
  let controller: MiniaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiniaturesController],
      providers: [MiniaturesService],
    }).compile();

    controller = module.get<MiniaturesController>(MiniaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
