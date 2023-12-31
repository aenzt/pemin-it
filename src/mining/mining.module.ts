import { Module } from '@nestjs/common';
import { MiningService } from './mining.service';
import { MiningController } from './mining.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MiningService],
  controllers: [MiningController],
  imports: [PrismaModule]
})
export class MiningModule {}
