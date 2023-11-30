import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateProjectDTO from './dto/createProject.dto';
import CreateGeneralDTO from './dto/createGeneral.dto';
import CreateDataAnalysisDTO from './dto/createDataAnalysis.dto';

@Injectable()
export class RNDService {
  constructor(private prisma: PrismaService) {}
  async getAllProjects() {
    const research = await this.prisma.project.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        lab_name: true,
        person_responsible: true,
        dataAnalysis: true,
        idGeneral: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!research) throw new NotFoundException('project not found');

    return research;
  }

  async getProjectById(id: number) {
    const research = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!research)
      throw new NotFoundException(`project with id ${id} not found`);

    return research;
  }

  async createGeneral(body: CreateGeneralDTO) {
    const { activity_update, day_total, location, money_total, project_count } =
      body;
    const general = await this.prisma.general.create({
      data: {
        activity_update,
        day_total,
        location,
        money_total,
        project_count,
        timestamp: new Date(),
      },
    });

    if (!general) throw new BadRequestException('error creating general');

    return general;
  }

  async getGenerals(id?: number) {
    if (!id || isNaN(id)) {
      return await this.prisma.general.findMany();
    }

    const general = await this.prisma.general.findUnique({
      where: {
        id,
      },
    });

    if (!general) {
      throw new NotFoundException('General not found');
    }

    return [general];
  }

  async createProject(body: CreateProjectDTO) {
    const { idGeneral, lab_name, name, person_responsible, status } = body;
    try {
      const newResearch = await this.prisma.project.create({
        data: {
          lab_name,
          name,
          person_responsible,
          status,
          general: {
            connect: {
              id: idGeneral,
            },
          },
        },
      });

      if (!newResearch) throw new BadRequestException('research not created');

      await this.prisma.general.update({
        where: {
          id: idGeneral,
        },
        data: {
          project_count: {
            increment: 1,
          },
        },
      });

      return newResearch;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateProjectById(id: number, body: CreateProjectDTO) {
    try {
      const project = await this.prisma.project.update({
        where: {
          id,
        },
        data: {
          ...body,
        },
      });

      if (!project) throw new BadRequestException('error updating project');

      return project;
    } catch (error) {
      throw new InternalServerErrorException('error processing request');
    }
  }

  async deleteProject(id: number) {
    try {
      const project = await this.prisma.project.delete({
        where: {
          id,
        },
      });

      if (!project) throw new NotFoundException('project not found');

      await this.prisma.general.update({
        where: {
          id: project.idGeneral,
        },
        data: {
          project_count: {
            decrement: 1,
          },
        },
      });

      return project;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createDataAnalysis(body: CreateDataAnalysisDTO) {
    try {
      const { category, idProject, person_responsible, result, storage } = body;

      const newDataAnalysis = await this.prisma.dataAnalysis.create({
        data: {
          category,
          person_responsible,
          result,
          storage,
          project: {
            connect: {
              id: idProject,
            },
          },
        },
      });

      if (!newDataAnalysis)
        throw new BadRequestException('error creating data analysis');

      return newDataAnalysis;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateDataAnalysisById(id: number, body: CreateDataAnalysisDTO) {
    try {
      const { category, person_responsible, result, storage } = body;

      const newDataAnalysis = await this.prisma.dataAnalysis.update({
        where: {
          id,
        },
        data: {
          category,
          person_responsible,
          result,
          storage,
        },
      });

      if (!newDataAnalysis)
        throw new BadRequestException('error updating data analysis');

      return newDataAnalysis;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteDataAnalysisById(id: number) {
    try {
      const newDataAnalysis = await this.prisma.dataAnalysis.delete({
        where: {
          id,
        },
      });

      if (!newDataAnalysis)
        throw new BadRequestException('error deleting data analysis');

      return newDataAnalysis;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
