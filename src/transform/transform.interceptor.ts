import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';

interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export default class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        message:
          this.reflector.get<string>(
            'response_message',
            context.getHandler(),
          ) ||
          data.message ||
          '',
        statusCode: context.switchToHttp().getResponse().statusCode,
        data: data.result || data,
      })),
    );
  }
}
