import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import CreateLetterDto from './dto/createLetter.dto';
import EditLetterDto from './dto/editStatus.dto';

@Injectable()
export class LegalService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async getLetter(idLetter: number) {
    const letter = await this.prisma.legalLetter.findUnique({
      where: {
        idLetter,
      },
    });
    if (!letter) throw new NotFoundException('letter not found');
    return letter;
  }

  async getAllLetter(type?: 'masuk' | 'keluar') {
    const letter = await this.prisma.legalLetter.findMany({
      where: {
        type,
      },
      select: {
        idLetter: true,
        address: true,
        detail: true,
        companyName: true,
        status: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!letter) throw new NotFoundException('letter not found');
    return letter;
  }

  async requestLetter(body: CreateLetterDto) {
    const letter = await this.prisma.legalLetter.create({
      data: {
        ...body,
      },
    });

    return letter;
  }

  async editLetter(body: EditLetterDto, id: number) {
    const letter = await this.prisma.legalLetter.update({
      where: {
        idLetter: id,
      },
      data: {
        status: body.status,
      },
    });
    return letter;
  }
}
