import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthUserPayload } from 'src/module/users/interfaces/auth-interface';
import 'dotenv/config';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = this.getTokenFromAuthHeader(request);

    if (!token)
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
          status_code: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );

    try {
      const payload = await this.jwtService.verifyAsync<AuthUserPayload>(
        token,
        {
          secret: process.env.JWT_Secret,
        },
      );

      request.user = payload;
    } catch {
      throw new HttpException(
        {
          success: false,
          message: 'Unauthorized',
          status_code: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }

  private getTokenFromAuthHeader(req: Request): string | undefined {
    const authHeader = req.headers?.authorization;

    if (!authHeader) return undefined;

    const [type, token] = req.headers.authorization?.split(' ');

    return type === 'Bearer' ? token : undefined;
  }
}
