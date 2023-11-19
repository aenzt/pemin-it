import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LegalModule } from './legal/legal.module';
import { PrismaModule } from './prisma/prisma.module';
import { MiningModule } from './mining/mining.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';

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
  ],
})
export class AppModule {}
