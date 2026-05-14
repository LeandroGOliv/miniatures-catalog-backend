import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Condition, Brand } from '../../generated/prisma/client.js';
import { Type } from 'class-transformer';

export class CreateMiniatureDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  brand!: Brand;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  imgUrl!: string;

  @IsEnum(Condition)
  @IsNotEmpty()
  condition!: Condition;
}
