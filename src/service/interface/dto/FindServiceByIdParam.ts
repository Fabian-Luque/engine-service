import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FindServiceByIdRequestParam {
  @IsNumber()
  @ApiProperty({ example: 123 })
  readonly serviceId: number;
}
