import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LegalService {
    constructor(
        private prisma: PrismaService,
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
