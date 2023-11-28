import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class EditStatusDto {
  @IsNotEmpty()
  @ApiProperty({ required: false })
  status: 'selesai' | 'dalam_proses' | 'ditolak';
}

export default EditStatusDto;
