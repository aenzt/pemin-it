import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from '../../types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.payload) {
      return user.payload.userId;
    } else {
      return user.userId;
    }
  },
);
