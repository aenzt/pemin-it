import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateCustomerDto from './dto/createCustomer.dto';
import CreateCompanyDto from './dto/createCompany.dto';

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
        Username: true,
        sex: true,
        email: true,
        phoneNumber: true,
        description: true,
        company: true,
      },
    });
    if (!customer) throw new NotFoundException('customer not found');
    return customer;
  }

  async postCustomer(body: CreateCustomerDto) {
    const post_Customer = await this.prisma.customer.create({
      data: {
        description: body.description,
        email: body.email,
        phoneNumber: body.phoneNumber,
        sex: body.sex,
        Username: body.Username,
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
}
