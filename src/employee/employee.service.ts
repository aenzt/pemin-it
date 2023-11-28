import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEmployee() {
    return this.prisma.employee.findMany({
      select: {
        email: true,
        name: true,
        division: {
          select: {
            name: true,
          },
        },
        address: true,
        birthDate: true,
        phoneNumber: true,
        sex: true,
      },
    });
  }

  async getEmployeeById(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        division: {
          select: {
            name: true,
          },
        },
        address: true,
        birthDate: true,
        phoneNumber: true,
        sex: true,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }
}
