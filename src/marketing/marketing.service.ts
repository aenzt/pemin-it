import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateCustomerDto from './dto/createCustomer.dto';
import CreateCompanyDto from './dto/createCompany.dto';
import ConsultDTO from './dto/consult.dto';

@Injectable()
export class MarketingService {
  constructor(
    private configServce: ConfigService,
    private prisma: PrismaService,
  ) {}

  async getCustomerbyId(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        idCust: id,
      },
      select: {
        username: true,
        email: true,
        company: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!customer) throw new NotFoundException('customer not found');
    return customer;
  }

  async postCustomer(body: CreateCustomerDto) {
    const post_Customer = await this.prisma.customer.create({
      data: {
        email: body.email,
        username: body.username,
        company: {
          connect: {
            IdComp: parseInt(body.idComp),
          },
        },
      },
    });
    return post_Customer;
  }

  async postCompany(body: CreateCompanyDto) {
    const newCompany = await this.prisma.company_Marketing.create({
      data: {
        ...body,
      },
    });

    return newCompany;
  }

  async getCompany(id: number) {
    const company = await this.prisma.company_Marketing.findUnique({
      where: {
        IdComp: id,
      },
    });

    if (!company) throw new NotFoundException('company not found');
    return company;
  }

  async consult(body: ConsultDTO) {
    const company = await this.prisma.company_Marketing.create({
      data: {
        name: body.name,
        address: body.address,
        phoneNumber: body.phoneNumber,
        about: body.about,
        message: body.message,
        customer: {
          create: {
            username: body.username,
            email: body.email,
          },
        },
      },
    });

    return company;
  }
}
