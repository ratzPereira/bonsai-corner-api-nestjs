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
import { UserFollowings } from './dto/followings';
import { UserFollowers } from './dto/followers';
import { Follow } from '../profile/follow.entity';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    private emailService: EmailService,
  ) {}

  async createUser(userdto: CreateUserDTO): Promise<User> {

    const errorResponse = {
      errors: {}
    }
    const userByEmail = await this.userRepository.findOne({
      where: { email: userdto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: userdto.username },
    });

    if(userByEmail) errorResponse.errors['email'] = 'has already been taken'
    if(userByUsername) errorResponse.errors['username'] = 'has already been taken'

    if (userByEmail || userByUsername)
      throw new HttpException(
        errorResponse,
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

    const errorResponse = {
      errors: {
        'email or password': 'is incorrect'
      }
    }

    const userByEmail = await this.userRepository.findOne({
      where: { email: loginRequesDTO.email },
      select: ['id', 'username', 'password', 'bio', 'image', 'email'],
    });

    if (!userByEmail)
      throw new HttpException(
        errorResponse,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isPasswordCorrect = await compare(
      loginRequesDTO.password,
      userByEmail.password,
    );

    if (!isPasswordCorrect)
      throw new HttpException(
        errorResponse,
        HttpStatus.UNPROCESSABLE_ENTITY,
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

  async getFollowings(currentUser: User): Promise<UserFollowings>{

    const username = currentUser.username
    const user = await this.userRepository.findOne({ where: { username } });

    if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const followerId = user.id

    const queryBuilder = this.followRepository.createQueryBuilder('follows');
    
    const results = await queryBuilder
      .where('follows.followerId = :followerId', { followerId })
      .leftJoinAndSelect(User, 'user', 'user.id = follows.followingId')
      .select('user.username', 'username')
      .getRawMany();

    const usernames: string[] = results.map(result => result.username);
    return {followings: usernames}
  }

  async getFollowers(currentUser: User): Promise<UserFollowers>{

    const username = currentUser.username
    const user = await this.userRepository.findOne({ where: { username } });

    if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const followingId = user.id

    const queryBuilder = this.followRepository.createQueryBuilder('follows');
    
    const results = await queryBuilder
      .where('follows.followingId = :followingId', { followingId })
      .leftJoinAndSelect(User, 'user', 'user.id = follows.followerId')
      .select('user.username', 'username')
      .getRawMany();

    const usernames: string[] = results.map(result => result.username);
    return {followers: usernames}
  }

  buildUserResponse(user: User): UserResponseInterface {
    // eslint-disable-next-line prettier/prettier
    return {...user, token: this.generateJwt(user)};
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
