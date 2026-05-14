import { Type } from 'class-transformer';
import { Brand, Condition } from '../../generated/prisma/client.js';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class GetMiniaturesDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Brand)
  brand?: Brand;

  @IsOptional()
  @IsEnum(Condition)
  condition?: Condition;
}
