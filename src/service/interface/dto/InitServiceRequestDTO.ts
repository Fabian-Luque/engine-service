import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InitServiceRequestDTO {
  @IsNumber()
  @ApiProperty({ example: 'ABCD12' })
  readonly patent: string;

  @IsNumber()
  @ApiProperty({ example: '1000' })
  readonly vehicleOwner: number;

  @IsNumber()
  @ApiProperty({ example: '2' })
  readonly typeService: number;

  @IsString()
  @ApiProperty({ example: 'Lorem Ipsum' })
  readonly commentOwner: string;
}
