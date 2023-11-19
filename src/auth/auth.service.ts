import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const {
      email,
      password,
      name,
      division,
      address,
      birthDate,
      phoneNumber,
      sex,
    } = registerDto;
    const hashedPassword = await argon.hash(password);

    const user = await this.prisma.employee.create({
      data: {
        email,
        password: hashedPassword,
        name,
        address,
        birthDate: new Date(birthDate),
        phoneNumber,
        sex,
        division: {
          connect: {
            idDivision: division,
          },
        },
      },
    });

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.employee.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isValid = await argon.verify(user.password, password);
    if (!isValid) throw new BadRequestException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.employee.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied');

    const isValid = await argon.verify(user.hashedRefreshToken, refreshToken);
    if (!isValid) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  private async generateTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email },
        {
          secret: this.configService.get('ACCESS_SECRET'),
          expiresIn: 60 * 15, //15 minutes
        },
      ),
      this.jwtService.signAsync(
        { userId, email },
        {
          secret: this.configService.get('REFRESH_SECRET'),
          expiresIn: 60 * 60 * 24 * 7, //7 days
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRtHash(employeeId: number, refreshToken: string) {
    const hash = await argon.hash(refreshToken);

    await this.prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        hashedRefreshToken: hash,
      },
    });
  }

  async logout(userId: number): Promise<Boolean> {
    await this.prisma.employee.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
    return true;
  }
}
