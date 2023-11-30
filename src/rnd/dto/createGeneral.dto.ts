import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateGeneralDTO {
  @IsNotEmpty()
  @ApiProperty()
  activity_update: string;

  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsNotEmpty()
  @ApiProperty()
  project_count: number;

  @IsNotEmpty()
  @ApiProperty()
  money_total: number;

  @IsNotEmpty()
  @ApiProperty()
  day_total: number;
}

export default CreateGeneralDTO;
