import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class InitServiceRequestDTO {
  @IsObject()
  @ApiProperty()
  readonly vehicle: any;

  @IsObject()
  @ApiProperty()
  readonly vehicleOwner: any;

  @IsNumber()
  @ApiProperty({ example: '2' })
  readonly typeService: number;

  @IsString()
  @ApiProperty({ example: 'Lorem Ipsum' })
  readonly commentOwner: string;

  @IsNumber()
  @ApiProperty({ example: '2' })
  readonly garageId: number;
}
