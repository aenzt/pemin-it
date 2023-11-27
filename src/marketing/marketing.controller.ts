import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/transform/response_message.decorator';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';
import CreateCustomerDto from './dto/createCustomer.dto';
import CreateCompanyDto from './dto/createCompany.dto';

@Controller('marketing')
@ApiTags('Marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Get('/customer/:id')
  @ResponseMessage('success getting customer')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getCustomerbyId(@Param('id') id: string) {
    return this.marketingService.getCustomerbyId(parseInt(id));
  }

  @Post('/customer')
  @ResponseMessage('new customer created')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createCustomer(@Body() body: CreateCustomerDto) {
    return this.marketingService.postCustomer(body);
  }

  @Get('/company/:id')
  @ResponseMessage('success getting company')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getCompanybyId(@Param('id') id: string) {
    return this.marketingService.getCompany(parseInt(id));
  }
  @Post('/company')
  @ResponseMessage('new company created')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createCompany(@Body() body: CreateCompanyDto) {
    return this.marketingService.postCompany(body);
  }
}
