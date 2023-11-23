import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export default LoginDto;
