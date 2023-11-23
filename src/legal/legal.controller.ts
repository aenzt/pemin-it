import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LegalService } from './legal.service';
import { ResponseMessage } from 'src/transform/response_message.decorator';
import { AccessTokenGuard } from 'src/auth/common/guards/accessToken.guard';
import CreateLetterDto from './dto/createLetter.dto';
import EditStatusDto from './dto/editStatus.dto';

@Controller('legal')
@ApiTags('Legal')
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  @Get('/letter')
  @ResponseMessage('success getting all letters')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getAllLetter(@Query('type') type?: 'masuk' | 'keluar') {
    return this.legalService.getAllLetter(type);
  }

  @Get('/letter/:id')
  @ResponseMessage('success getting letter')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  getLetterById(@Param('id') id: string) {
    return this.legalService.getLetter(parseInt(id));
  }

  @Post('/letter')
  @ResponseMessage('new letter created')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  createLetter(@Body() body: CreateLetterDto) {
    return this.legalService.requestLetter(body);
  }

  @Put('/letter/:id')
  @ResponseMessage('letter edited')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  editLetter(@Body() body: EditStatusDto, @Param('id') id: string) {
    return this.legalService.editLetter(body, parseInt(id));
  }
}
