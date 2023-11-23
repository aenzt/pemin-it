import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateLetterDto {
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  companyName: string;

  @IsNotEmpty()
  @ApiProperty()
  detail: string;

  @IsNotEmpty()
  @ApiProperty()
  endedAt: string;

  @IsNotEmpty()
  @ApiProperty()
  startedAt: string;

  @IsNotEmpty()
  @ApiProperty()
  status: 'selesai' | 'dalam_proses' | 'ditolak';

  @IsNotEmpty()
  @ApiProperty()
  type: 'masuk' | 'keluar';
}

export default CreateLetterDto;
