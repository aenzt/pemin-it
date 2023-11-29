import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MiningService } from './mining.service';
import { ResponseMessage } from 'src/transform/response_message.decorator';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';
import PostHealthSurveyDTO from './dto/postHealthSurvey.dto';
import PostToolSurvey from './dto/postToolSurvey.dto';

@Controller('mining')
@ApiTags('Mining')
export class MiningController {
  constructor(private readonly miningService: MiningService) {}

  @Get('/employee')
  @ResponseMessage('success getting all mining employees')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getAllMiningEmployee() {
    return this.miningService.getAllEmployee();
  }

  @Get('/health-survey/:id')
  @ResponseMessage('success getting health survey')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getHealthSurvey(@Param() idEmployee: number) {
    return this.miningService.getHealthSurvey(idEmployee);
  }

  @Post('/health-survey')
  @ResponseMessage('success creating health survey')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  postHealthSurvey(@Body() body: PostHealthSurveyDTO) {
    return this.miningService.postHealthSurvey(body);
  }

  @Get('/tool-survey')
  @ResponseMessage('success getting tool survey')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getToolSurvey(@Param() idEmployee: number) {
    return this.miningService.getToolSurvey(idEmployee);
  }

  @Post('/tool-survey')
  @ResponseMessage('success creating tool survey')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  postToolSurvey(@Body() body: PostToolSurvey) {
    return this.miningService.postToolSurvey(body);
  }

  @Get('/mining-schedule')
  @ResponseMessage('success getting mining schedule')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getScheduleByMonth(@Param() idSchedule: number) {
    return this.miningService.getScheduleByMonth(idSchedule);
  }
}
