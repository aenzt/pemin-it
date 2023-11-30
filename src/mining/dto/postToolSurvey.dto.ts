import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class PostToolSurvey {
  @IsNotEmpty()
  @ApiProperty()
  employeeId: number;

  @IsNotEmpty()
  @ApiProperty()
  hasGloves: boolean;

  @IsNotEmpty()
  @ApiProperty()
  hasGoogles: boolean;

  @IsNotEmpty()
  @ApiProperty()
  hasVest: boolean;

  @IsNotEmpty()
  @ApiProperty()
  hasHelmet: boolean;
}

export default PostToolSurvey;
