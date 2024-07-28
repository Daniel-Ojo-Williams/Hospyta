import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllPostsQueryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsString()
  @IsOptional()
  created_at?: string;

  @IsString()
  @IsOptional()
  category_id?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  up_vote?: number;
}
