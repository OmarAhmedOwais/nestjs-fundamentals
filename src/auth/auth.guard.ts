import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtStrategy } from 'src/user/strategy/jwt.strategy';
import { JwtPayload } from '../data/interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // check if the route is public
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;
    // get token from header or query params
    const isTokenExist = request.headers.authorization?.startsWith('Bearer');
    // check if the token exists
    if (!isTokenExist) {
      throw new UnauthorizedException(
        {
          en: 'please login to first to get access',
          ar: 'يرجى تسجيل الدخول أولاً',
        }
      );
    }
    const token = request.header('Authorization').split(' ')[1];
    // verify the token
    const decodedToken: JwtPayload = this.authService.validateToken(token!);

    // get the user id from the decoded token
    const userId = decodedToken._id;
    const payload= {sub:userId} as JwtPayload;
    const user = await this.jwtStrategy.validate(payload);
    // check if the user exists
    if (!user) {
      throw new UnauthorizedException(
        {
          en: 'Unauthorized access',
          ar: 'ليس لديك صلاحية الوصول',
        }
      );
    }

   // check if the user changed the password after the token was issued
   const isPasswordChanged = user.changePasswordAt && user.changePasswordAt.getTime() > decodedToken.iat * 1000;

   if (isPasswordChanged) {
    throw new UnauthorizedException(
       {
         en: "session expired, please login again",
         ar: "انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى",
       }
     )
   }

   // add the user to the request object
   request.user = user;

    return true;
  }
}