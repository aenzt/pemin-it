import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LegalModule } from './legal/legal.module';
import { PrismaModule } from './prisma/prisma.module';
import { MiningModule } from './mining/mining.module';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { FinanceModule } from './finance/finance.module';
import { RndModule } from './rnd/rnd.module';

@Module({
  imports: [
    AuthModule,
    LegalModule,
    PrismaModule,
    MiningModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeeModule,
    FinanceModule,
    RndModule,
  ],
})
export class AppModule {}
