import { IsString, IsEmail, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ValidateIf((dto) => typeof dto.lastName === 'undefined')
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ValidateIf((dto) => typeof dto.email === 'undefined')
  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}
