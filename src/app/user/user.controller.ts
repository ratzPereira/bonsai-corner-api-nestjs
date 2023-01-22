import { User } from './user.entity';
import { LoginResquestDTO } from './dto/login-request.dto';
import { UserResponseInterface } from './types/user.response.interface';
import { UserService } from './user.service';
import { Body, Post, UsePipes } from '@nestjs/common/decorators';
import { Controller, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('api/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDTO);
    return this.userService.buildUserResponse(user);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginRequestDTO: LoginResquestDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginRequestDTO);
    return this.userService.buildUserResponse(user);
  }
}
