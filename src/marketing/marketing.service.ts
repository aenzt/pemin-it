import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateCustomerDto from './dto/createCustomer.dto';
import { Company_Marketing } from '@prisma/client';
import CreateCompanyDto from './dto/createCompany.dto';

@Injectable()
export class MarketingService {
    constructor(
        private configServce: ConfigService,
        private prisma: PrismaService
    ) {}

    async getCustomerbyId(id: number) {
        const customer = await this.prisma.customer.findUnique({
            where: {
                idCust: id
            },
            select : {
                company: true
            }
        })
        if (!customer) throw new NotFoundException('customer not found');
        return customer;
    }

    async postCustomer(body: CreateCustomerDto ) {
        const company = await this.prisma.company_Marketing.findUnique({
            where : {
                IdComp: parseInt(body.idComp)
            }
        })

        if(!company) throw new NotFoundException("Company not found")
        else{
            const post_Customer = await this.prisma.customer.create({
                data: {              
                 description: body.description,
                 email : body.email,
                 phoneNumber : body.phoneNumber,
                 sex: body.sex,
                 Username : body.Username,
                 company: company
                }
            });
            return post_Customer;
        }   
    }

    async postCompany(body: CreateCompanyDto) {
        const newCompany = await this.prisma.company_Marketing.create({
            data: {
                ...body
            }
        })

        return newCompany
    }

    async getCompany(id: number) {
        const companies = await this.prisma.company_Marketing.findMany({
            where: {
                IdComp: id
            }
        })

        if(!companies) throw new NotFoundException('company not found')
        return companies
    }
}
