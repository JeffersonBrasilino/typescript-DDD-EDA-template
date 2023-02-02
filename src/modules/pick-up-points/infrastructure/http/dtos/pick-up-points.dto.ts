import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional,
} from 'class-validator';

class PointLocation {
  @ApiProperty({ description: 'tipo de coordenadas', required: true })
  @IsNotEmpty()
  @Transform((v) => v.value.trim())
  type: 'Point' | 'Other';

  @ApiProperty({
    description: 'array de coordenadas [lon, lat] da localização',
    type: Number,
    isArray: true,
    example: ['number', 'number'],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  coordinates: number[];
}
export class PickUpPointsDto {
  @ApiProperty({ description: 'nome do estabelecimento', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform((v) => v.value.trim())
  readonly establishment: string;

  @ApiProperty({ description: 'endereço do estabelecimento', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform((v) => v.value.trim())
  readonly address: string;

  @ApiProperty({
    description: 'numero do local do estabelecimento',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Transform((v) => v.value.trim())
  readonly number: string;

  @ApiProperty({ description: 'UF do estabelecimento', required: true })
  @IsString()
  @IsNotEmpty()
  @Transform((v) => v.value.trim())
  readonly state: string;

  @ApiProperty({
    description: 'CEP do endereço do estabelecimento',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Transform((v) => v.value.trim())
  readonly zipCode: string;

  @ApiProperty({
    description: 'região do endereço do estabelecimento',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Transform((v) => v.value.trim())
  readonly region: string;

  @ApiProperty({
    description: 'Coordenadas geográficas do endereço do estabelecimento',
    required: true,
    type: PointLocation,
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PointLocation)
  readonly location: PointLocation;

  @ApiProperty({
    description: 'flag que diz se o pick-up está ativo',
    required: false,
    default: true,
  })
  @IsOptional()
  readonly enable: boolean;
}
