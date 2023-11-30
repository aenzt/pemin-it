import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/transform/response_message.decorator';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';
import { RNDService } from './rnd.service';
import CreateGeneralDTO from './dto/createGeneral.dto';
import CreateProjectDTO from './dto/createProject.dto';
import CreateDataAnalysisDTO from './dto/createDataAnalysis.dto';

@Controller('rnd')
@ApiTags('RnD')
export class RNDController {
  constructor(private readonly rndService: RNDService) {}

  @Get('/generals')
  @ResponseMessage('Success get generals')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'id',
    type: Number,
    example: 1,
    required: false,
  })
  getAllGenerals(@Query('id') id: string) {
    return this.rndService.getGenerals(parseInt(id));
  }

  @Post('/generals')
  @ResponseMessage('Success creating general')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createGeneral(@Body() body: CreateGeneralDTO) {
    return this.rndService.createGeneral(body);
  }

  @Get('/projects')
  @ResponseMessage('Success get projects')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getAllProjects() {
    return this.rndService.getAllProjects();
  }

  @Get('/projects/:id')
  @ResponseMessage('Success get project')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getProjectById(@Param('id') id: string) {
    return this.rndService.getProjectById(parseInt(id));
  }

  @Post('/projects')
  @ResponseMessage('Success create new project')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createEmployee(@Body() body: CreateProjectDTO) {
    return this.rndService.createProject(body);
  }

  @Put('/projects/:id')
  @ResponseMessage('Success update project')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  updateProjectById(@Param('id') id: string, @Body() body: CreateProjectDTO) {
    return this.rndService.updateProjectById(parseInt(id), body);
  }

  @Delete('/projects/:id')
  @ResponseMessage('Success delete project')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  deleteProject(@Param('id') id: string) {
    return this.rndService.deleteProject(parseInt(id));
  }

  @Post('/data-analysis')
  @ResponseMessage('Success create new data analysis')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createDataAnalysis(@Body() body: CreateDataAnalysisDTO) {
    return this.rndService.createDataAnalysis(body);
  }

  @Put('/data-analysis')
  @ResponseMessage('Success update data analysis')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  updateDataAnalysis(
    @Param('id') id: string,
    @Body() body: CreateDataAnalysisDTO,
  ) {
    return this.rndService.updateDataAnalysisById(parseInt(id), body);
  }

  @Delete('/data-analysis')
  @ResponseMessage('Success delete data analysis')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  deleteDataAnalysis(@Param('id') id: string) {
    return this.rndService.deleteDataAnalysisById(parseInt(id));
  }
}
