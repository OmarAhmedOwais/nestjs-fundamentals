import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtServe: JwtService) {}
    
    validateToken(token: string) {
        return this.jwtServe.verify(token, {
            secret : process.env.JWT_SECRET_KEY
        });
    }
}