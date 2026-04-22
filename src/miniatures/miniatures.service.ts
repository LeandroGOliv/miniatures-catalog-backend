import { Injectable } from '@nestjs/common';
import { CreateMiniatureDto } from './dto/create-miniature.dto';
import { UpdateMiniatureDto } from './dto/update-miniature.dto';

@Injectable()
export class MiniaturesService {
  create(createMiniatureDto: CreateMiniatureDto) {
    return 'This action adds a new miniature';
  }

  findAll() {
    return `This action returns all miniatures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} miniature`;
  }

  update(id: number, updateMiniatureDto: UpdateMiniatureDto) {
    return `This action updates a #${id} miniature`;
  }

  remove(id: number) {
    return `This action removes a #${id} miniature`;
  }
}
