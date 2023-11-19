import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseMessage } from '../transform/response_message.decorator';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { AccessTokenGuard } from './common/guards/accessToken.guard';
import { GetCurrentUser, GetCurrentUserId } from './common/decorators';
import { RefreshTokenGuard } from './common/guards/refreshToken.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ResponseMessage('User register success')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  @ResponseMessage('User login success')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  @ResponseMessage('User logout success')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Post('/refresh')
  @ResponseMessage('Token refreshed')
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
