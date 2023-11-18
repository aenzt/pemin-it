import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum Sex {
  M = 'M',
  F = 'F',
}

class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  division: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'YYYY-MM-DD',
  })
  birthDate: string;

  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(Sex)
  @ApiProperty({
    enum: Sex,
    example: 'M/F',
  })
  sex: Sex;
}

export default RegisterDto;
