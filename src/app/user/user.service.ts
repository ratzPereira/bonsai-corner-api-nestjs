import { UserResponseInterface } from './types/user.response.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userdto: CreateUserDTO): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: userdto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { email: userdto.username },
    });

    if (userByEmail || userByUsername)
      throw new HttpException(
        'Email or Username already exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const newUser = new User();
    Object.assign(newUser, userdto);

    return await this.userRepository.save(newUser);
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }
}
