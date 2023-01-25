import { ProfileResponse } from './types/profile.response.interface';
import { ProfileType } from './types/profile.type';
import { User } from './../user/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getProfile(currentUser: User, username: string): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return { ...user, following: false };
  }

  followUser(currentUser: User, username: string) {}

  unfollowUser(currentUser: User, username: string) {}

  buildProfileResponse(profile: ProfileType): ProfileResponse {

    delete profile.email;
    return { profile };
  }
}
