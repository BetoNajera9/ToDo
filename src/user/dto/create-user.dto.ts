import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  /**
   * The name of the user
   * @example Brad
   */
  @ApiProperty({ description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * The last name of the user
   * @example Torp
   */
  @ApiProperty({ description: 'last name of the user' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

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
