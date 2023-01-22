import { AuthGuard } from './guards/auth.guard';
import { User } from './user.entity';
import { ExpressRequest } from './types/express.request.interface';
import { LoginResquestDTO } from './dto/login-request.dto';
import { UserResponseInterface } from './types/user.response.interface';
import { UserService } from './user.service';
import { Body, Post, UsePipes, Get, UseGuards } from '@nestjs/common/decorators';
import { Controller,  ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDecorator } from './decorator/user.decorator';

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

  @Get('/user')
  @UseGuards(AuthGuard)
  async getCurrentUser(
    @UserDecorator('id') user: User,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}
