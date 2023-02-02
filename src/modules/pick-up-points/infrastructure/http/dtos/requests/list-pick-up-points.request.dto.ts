import { PaginationQueryDto } from '@core/infrastructure/http/pagination-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class ListPickUpPointsRequestDto extends PaginationQueryDto {
  @ApiProperty({
    description: 'latitude da origem',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({
    description: 'longitude da origem ',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({
    description: 'raio de busca do posto',
    required: false,
  })
  @IsOptional()
  @IsPositive()
  distance?: number;

  @ApiProperty({
    description: 'nome do estabelecimento',
    required: false,
  })
  @IsOptional()
  @IsString()
  establishment?: string;

  @ApiProperty({
    description: 'flag que diz se o pick-up está ativo',
    required: false,
  })
  @IsOptional()
  enable?: boolean;
}
