import { Module } from '@nestjs/common';
import { MiningService } from './mining.service';
import { MiningController } from './mining.controller';

@Module({
  providers: [MiningService],
  controllers: [MiningController]
})
export class MiningModule {}
