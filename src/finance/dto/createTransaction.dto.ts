import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateTransactionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  seller_name: string;

  @IsString()
  @ApiProperty()
  note: string;

  @IsString()
  @ApiProperty()
  price: string;

  @IsString()
  @ApiProperty()
  receipt: string;

  @IsString()
  @ApiProperty()
  type: string;
}

export default CreateTransactionDTO;
