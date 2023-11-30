import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateDataAnalysisDTO {
  @IsNotEmpty()
  @ApiProperty()
  result: string;

  @IsNotEmpty()
  @ApiProperty()
  storage: string;

  @IsNotEmpty()
  @ApiProperty()
  person_responsible: string;

  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  idProject: number;
}

export default CreateDataAnalysisDTO;
