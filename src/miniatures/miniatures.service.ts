import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMiniatureDto } from './dto/create-miniature.dto.js';
import { UpdateMiniatureDto } from './dto/update-miniature.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { GetMiniaturesDto } from './dto/get-miniatures.dto.js';

@Injectable()
export class MiniaturesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMiniatureDto: CreateMiniatureDto) {
    return await this.prisma.miniature.create({ data: createMiniatureDto });
  }

  async findAll({
    page = 1,
    limit = 10,
    name,
    brand,
    condition,
  }: GetMiniaturesDto) {
    const skip = (page - 1) * limit;
    const where = {} as any;
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (brand) where.brand = brand;
    if (condition) where.condition = condition;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.miniature.findMany({
        where: where,
        take: limit,
        skip,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prisma.miniature.count({ where }),
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
