import { UserResponseInterface } from './types/user.response.interface';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Body, Post } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('api/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDTO);
    return this.userService.buildUserResponse(user);
  }
}
