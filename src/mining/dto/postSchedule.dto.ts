import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class PostSchedule {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'YYYY-MM-DD',
  })
  startDate: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'YYYY-MM-DD',
  })
  endDate: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  activity: string;

  @IsNotEmpty()
  @ApiProperty()
  status: string;
}

export default PostSchedule;
