import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMiniatureDto } from './dto/create-miniature.dto.js';
import { UpdateMiniatureDto } from './dto/update-miniature.dto.js';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class MiniaturesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMiniatureDto: CreateMiniatureDto) {
    return await this.prisma.miniature.create({ data: createMiniatureDto });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.miniature.findMany({
        take: limit,
        skip,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prisma.miniature.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const miniature = await this.prisma.miniature.findUnique({
      where: { id },
    });

    if (!miniature) {
      throw new NotFoundException(`Miniatura #${id} não encontrada`);
    }

    return miniature;
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
