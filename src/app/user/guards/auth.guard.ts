import { ExpressRequest } from './../types/express.request.interface';
import {
  CanActivate,
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (request.user) return true;

    throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
  }
}
