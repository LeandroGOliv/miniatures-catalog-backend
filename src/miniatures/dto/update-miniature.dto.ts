import { PartialType } from '@nestjs/mapped-types';
import { CreateMiniatureDto } from './create-miniature.dto.js';

export class UpdateMiniatureDto extends PartialType(CreateMiniatureDto) {}
