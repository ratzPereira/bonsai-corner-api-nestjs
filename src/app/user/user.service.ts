import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userdto: CreateUserDTO):Promise<User> {
    const newUser = new User();

    Object.assign(newUser, userdto);

    return await this.userRepository.save(newUser);
  }
}
