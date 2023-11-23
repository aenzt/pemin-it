import {
  Controller,
  Delete,
  Get,
  Body,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { ResponseMessage } from 'src/transform/response_message.decorator';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';
import CreateTransactionDTO from './dto/createTransaction.dto';

@Controller('finance')
@ApiTags('Finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('/transactions')
  @ResponseMessage('Success get all transactions')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'from',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'to',
    type: String,
    required: false,
  })
  getAllEmployee(@Query('from') from?: string, @Query('to') to?: string) {
    return this.financeService.getTransactions(from, to);
  }

  @Get('/transactions/:id')
  @ResponseMessage('Success get transaction')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getEmployeeById(@Param('id') id: string) {
    return this.financeService.getTransactionById(parseInt(id));
  }

  @Post('/transactions')
  @ResponseMessage('Success create new transaction')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createEmployee(@Body() body: CreateTransactionDTO) {
    return this.financeService.createTransaction(body);
  }

  @Delete('/transactions/:id')
  @ResponseMessage('Success delete transaction')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  deleteTransactionById(@Param('id') id: string) {
    return this.financeService.deleteTransactionById(parseInt(id));
  }
}
