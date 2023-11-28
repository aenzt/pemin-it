import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/transform/response_message.decorator';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';
import { RNDService } from './rnd.service';
import { Project } from '@prisma/client';

@Controller('rnd')
@ApiTags('RnD')
export class RNDController {
  constructor(private readonly rndService: RNDService) {}

  @Get('/projects')
  @ResponseMessage('Success get projects')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getAllProjects() {
    return this.rndService.getAllProjects();
  }

  @Post('/projects')
  @ResponseMessage('Success create new project')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createEmployee(@Body() body: Project) {
    return this.rndService.createProject(body);
  }
}
