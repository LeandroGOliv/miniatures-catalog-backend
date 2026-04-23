import { Test, TestingModule } from '@nestjs/testing';
import { MiniaturesService } from './miniatures.service';

describe('MiniaturesService', () => {
  let service: MiniaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniaturesService],
    }).compile();

    service = module.get<MiniaturesService>(MiniaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
