import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MiningService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
      ) {}
}
