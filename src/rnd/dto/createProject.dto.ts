import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateProjectDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  lab_name: string;

  @IsNotEmpty()
  @ApiProperty()
  person_responsible: string;

  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsNotEmpty()
  @ApiProperty()
  idGeneral: number;
}

export default CreateProjectDTO;
