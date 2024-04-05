import { IsString, IsEmail, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  /**
   * The name of the user
   * @example Brad
   */
  @ValidateIf((dto) => typeof dto.lastName === 'undefined')
  @ApiProperty({ description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * The last name of the user
   * @example Torp
   */
  @ApiProperty({ description: 'last name of the user' })
  @ValidateIf((dto) => typeof dto.email === 'undefined')
  @IsOptional()
  @IsString()
  lastName?: string;

  /**
   * The email of the user
   * @example example@email.com
   */
  @ApiProperty({ description: 'The email of the user' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
}
