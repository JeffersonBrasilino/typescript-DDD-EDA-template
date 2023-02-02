import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  perPage: number;
}
