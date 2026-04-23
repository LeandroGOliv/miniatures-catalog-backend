import { Injectable } from '@nestjs/common';
import { CreateMiniatureDto } from './dto/create-miniature.dto.js';
import { UpdateMiniatureDto } from './dto/update-miniature.dto.js';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class MiniaturesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMiniatureDto: CreateMiniatureDto) {
    return await this.prisma.miniature.create({ data: createMiniatureDto });
  }

  async findAll() {
    return await this.prisma.miniature.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.miniature.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateMiniatureDto: UpdateMiniatureDto) {
    return await this.prisma.miniature.update({
      where: { id },
      data: updateMiniatureDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.miniature.delete({
      where: { id },
    });
  }
}
