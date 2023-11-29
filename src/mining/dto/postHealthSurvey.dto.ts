import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class PostHealthSurveyDTO {
  @IsNotEmpty()
  @ApiProperty()
  employeeId: number;

  @IsNotEmpty()
  @ApiProperty()
  batuk: boolean;

  @IsNotEmpty()
  @ApiProperty()
  demam: boolean;

  @IsNotEmpty()
  @ApiProperty()
  pusing: boolean;

  @IsNotEmpty()
  @ApiProperty()
  sehat: boolean;
}

export default PostHealthSurveyDTO;
