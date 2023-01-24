import { EmailService } from './../mailer/email.service';
import { UpdateUserDTO } from './dto/update.user.dto';
import { LoginResquestDTO } from './dto/login-request.dto';
import { UserResponseInterface } from './types/user.response.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async createUser(userdto: CreateUserDTO): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: userdto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: userdto.username },
    });

    if (userByEmail || userByUsername)
      throw new HttpException(
        'Email or Username already exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const newUser = new User();
    Object.assign(newUser, userdto);

    await this.emailService.sendEmail(
      userdto.email,
      'Welcome to bonsai corner',
      `Hello ${userdto.username} thanks and welcome to Bonsai corner. Glad we have you here.`,
    );

    const userSaved = await this.userRepository.save(newUser);
    delete userSaved.password;
    return userSaved;
  }

  async login(loginRequesDTO: LoginResquestDTO): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginRequesDTO.email },
      select: ['id', 'username', 'password', 'bio', 'image', 'email'],
    });

    if (!userByEmail)
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST,
      );

    const isPasswordCorrect = await compare(
      loginRequesDTO.password,
      userByEmail.password,
    );

    if (!isPasswordCorrect)
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST,
      );

    delete userByEmail.password;
    return userByEmail;
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    Object.assign(user, updateUserDTO);

    return await this.userRepository.save(user);
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
