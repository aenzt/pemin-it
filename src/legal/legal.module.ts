import { Module } from '@nestjs/common';
import { LegalController } from './legal.controller';
import { LegalService } from './legal.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [LegalController],
    providers: [LegalService],
    imports: [PrismaModule]
  })
export class LegalModule {}
