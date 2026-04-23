import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Condition } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateMiniatureDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  brand!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsNotEmpty()
  imgUrl!: string;

  @IsEnum(Condition)
  @IsNotEmpty()
  condition!: Condition;
}
