import { Module } from '@nestjs/common';
import { RNDController } from './rnd.controller';
import { RNDService } from './rnd.service';

@Module({
  controllers: [RNDController],
  providers: [RNDService],
})
export class RndModule {}
