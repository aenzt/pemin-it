import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import PostHealthSurveyDTO from './dto/postHealthSurvey.dto';
import PostToolSurvey from './dto/postToolSurvey.dto';

@Injectable()
export class MiningService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async getAllEmployee() {
    const employees = await this.prismaService.employee.findMany({
      where: {
        idDivision: 'mining',
      },
    });

    if (!employees) throw new NotFoundException('employee not found');

    return employees;
  }

  async getHealthSurvey(idEmployee: number) {
    const healthSurveys = await this.prismaService.healthSurvey.findUnique({
      where: {
        idEmployee,
      },
    });

    if (!healthSurveys) throw new NotFoundException('health survey not found');

    return healthSurveys;
  }

  async postHealthSurvey(body: PostHealthSurveyDTO) {
    const { batuk, demam, pusing, sehat, employeeId } = body;
    const newHealthSurvey = await this.prismaService.healthSurvey.create({
      data: {
        batuk,
        demam,
        pusing,
        sehat,
        employeeOnMining: {
          connect: {
            employeeId,
          },
        },
      },
    });

    return newHealthSurvey;
  }

  async getToolSurvey(idEmployee: number) {
    const toolSurveys = await this.prismaService.toolSurvey.findMany({
      where: {
        idEmployee,
      },
    });

    if (!toolSurveys) throw new NotFoundException('tool surveys not found');

    return toolSurveys;
  }

  async postToolSurvey(body: PostToolSurvey) {
    const { hasGloves, hasGoogles, hasHelmet, hasVest, employeeId } = body;
    const newToolSurvey = await this.prismaService.toolSurvey.create({
      data: {
        hasGloves,
        hasGoogles,
        hasHelmet,
        hasVest,
        employeeOnMining: {
          connect: {
            employeeId,
          },
        },
      },
    });

    return newToolSurvey;
  }

  async getScheduleByMonth(idSchedule: number) {
    const miningSchedules = await this.prismaService.miningSchedule.findMany({
      where: {
        idSchedule,
      },
    });

    if (!miningSchedules)
      throw new NotFoundException('mining schedule not found');

    return miningSchedules;
  }
}
