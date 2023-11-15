import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.module';

@Injectable()
export class LegalService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
      ) {}

      async getLetter(idLetter: number){
        const letter = await this.prisma.letter.findMany({
            where: {
                id_letter: idLetter
            }
        })
        return letter;
      }
}
