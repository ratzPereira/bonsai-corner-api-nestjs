import { UpdateUserDTO } from './dto/update.user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './user.entity';
import { LoginResquestDTO } from './dto/login-request.dto';
import { UserResponseInterface } from './types/user.response.interface';
import { UserService } from './user.service';
import {
  Body,
  Post,
  UsePipes,
  Get,
  UseGuards,
  Put,
} from '@nestjs/common/decorators';
import { Controller, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDecorator } from './decorator/user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiTags('user')
@Controller('api/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register new user' })
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDTO);
    return this.userService.buildUserResponse(user);
  }

  @Post('/login')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body() loginRequestDTO: LoginResquestDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginRequestDTO);
    return this.userService.buildUserResponse(user);
  }

  @Get('/user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  async getCurrentUser(
    @UserDecorator() user: User,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('/user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update existent user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  async updateUser(
    @UserDecorator('id') currentUserID: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserID,
      updateUserDTO,
    );
    return this.userService.buildUserResponse(user);
  }
}
