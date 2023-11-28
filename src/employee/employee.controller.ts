import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ResponseMessage } from '../transform/response_message.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/common/guards/accessToken.guard';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/')
  @ResponseMessage('Get all employee')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getAllEmployee() {
    return this.employeeService.getAllEmployee();
  }

  @Get('/:id')
  @ResponseMessage('Get employee by id success')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(parseInt(id));
  }
}
