import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MiningService {
  constructor(
    private configService: ConfigService,
  ) {}
}
