import { Follow } from './follow.entity';
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
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {}

  async getProfile(currentUser: User, username: string): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if(!currentUser) return { ...user, following: false };
    
    const follow = await this.followRepository.findOne({
      where: {
        followerId: currentUser.id,
        followingId: user.id,
      },
    });
    return { ...user, following: Boolean(follow) };
  }

  async followUser(currentUser: User, username: string): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (currentUser.id === user.id)
      throw new HttpException(
        'You cant follow yourself',
        HttpStatus.BAD_REQUEST,
      );

    const follow = await this.followRepository.findOne({
      where: {
        followerId: currentUser.id,
        followingId: user.id,
      },
    });

    if (!follow) {
      const followToCreate = new Follow();
      followToCreate.followingId = user.id;
      followToCreate.followerId = currentUser.id;
      await this.followRepository.save(followToCreate);
    }

    return { ...user, following: true };
  }

  async unfollowUser(
    currentUser: User,
    username: string,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (currentUser.id === user.id)
      throw new HttpException(
        'You cant unfollow yourself',
        HttpStatus.BAD_REQUEST,
      );

    await this.followRepository.delete({
      followerId: currentUser.id,
      followingId: user.id,
    });

    return { ...user, following: false };
  }

  buildProfileResponse(profile: ProfileType): ProfileResponse {
    delete profile.email;
    return { profile };
  }
}
