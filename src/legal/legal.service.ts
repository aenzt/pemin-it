import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LegalService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async getLetter(idLetter: number) {
    const letter = await this.prisma.legalLetter.findMany({
      where: {
        idLetter,
      },
    });
    return letter;
  }
}
