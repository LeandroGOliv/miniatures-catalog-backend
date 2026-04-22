import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MiniaturesService } from './miniatures.service.js';
import { CreateMiniatureDto } from './dto/create-miniature.dto.js';
import { UpdateMiniatureDto } from './dto/update-miniature.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('miniatures')
@UseGuards(AuthGuard('jwt'))
export class MiniaturesController {
  constructor(private readonly miniaturesService: MiniaturesService) {}

  @Post()
  create(@Body() createMiniatureDto: CreateMiniatureDto) {
    return this.miniaturesService.create(createMiniatureDto);
  }

  @Get()
  findAll() {
    return this.miniaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miniaturesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMiniatureDto: UpdateMiniatureDto,
  ) {
    return this.miniaturesService.update(+id, updateMiniatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.miniaturesService.remove(+id);
  }
}
