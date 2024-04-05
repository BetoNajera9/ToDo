import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  /**
   * The email of the user
   * @example example@email.com
   */
  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  /**
   * The password of the user
   * @example 1q2w3e4r
   */
  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
