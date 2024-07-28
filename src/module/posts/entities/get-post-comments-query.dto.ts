import { IsNumber, IsOptional } from 'class-validator';

export class GetPostCommentsQueryDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
