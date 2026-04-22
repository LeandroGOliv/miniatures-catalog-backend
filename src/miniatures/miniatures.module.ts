import { Module } from '@nestjs/common';
import { MiniaturesService } from './miniatures.service.js';
import { MiniaturesController } from './miniatures.controller.js';

@Module({
  controllers: [MiniaturesController],
  providers: [MiniaturesService],
})
export class MiniaturesModule {}
