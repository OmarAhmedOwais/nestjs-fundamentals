// local.strategy
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { UsersService } from '../users.service';
import { User } from '../../data/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    return this.usersService.findByUsernameAndPassword(username, password);
  }
}
