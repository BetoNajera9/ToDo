import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamsIdDTO {
  /**
   * The user identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  @ApiProperty({ description: 'The user identifier of type UUID' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
