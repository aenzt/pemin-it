import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class RNDService {
  constructor(private prisma: PrismaService) {}
  async getAllProjects() {
    const research = await this.prisma.project.findMany();
    if (!research) throw new NotFoundException('project not found');

    return research;
  }

  async createProject(body: Project) {
    const newResearch = await this.prisma.project.create({
      data: {
        ...body,
      },
    });

    return newResearch;
  }

  async deleteProject(id: number) {
    const project = await this.prisma.project.delete({
      where: {
        id,
      },
    });
    if (!project) throw new NotFoundException('project not found');
    return project;
  }
}
