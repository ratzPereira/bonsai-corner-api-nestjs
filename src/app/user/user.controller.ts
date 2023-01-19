import { UserService } from './user.service';
import { Post } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';

@Controller('api/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(): Promise<any> {}
}
