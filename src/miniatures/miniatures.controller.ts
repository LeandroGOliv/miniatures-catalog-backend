import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { MiniaturesService } from './miniatures.service.js';
import { CreateMiniatureDto } from './dto/create-miniature.dto.js';
import { UpdateMiniatureDto } from './dto/update-miniature.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('miniatures')
export class MiniaturesController {
  constructor(private readonly miniaturesService: MiniaturesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMiniatureDto: CreateMiniatureDto) {
    return this.miniaturesService.create(createMiniatureDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.miniaturesService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miniaturesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMiniatureDto: UpdateMiniatureDto,
  ) {
    return this.miniaturesService.update(+id, updateMiniatureDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.miniaturesService.remove(+id);
  }
}
