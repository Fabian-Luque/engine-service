import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateServiceStateRequestDTO {
  @IsString()
  @ApiProperty({ example: 'Lorem Ipsum' })
  readonly state: string;
}
