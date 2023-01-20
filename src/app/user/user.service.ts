import { UserResponseInterface } from './types/user.response.interface';
import { Injectable } from '@nestjs/common';
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
    console.log(user + JWT_SECRET);
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
