import { ProfileResponse } from './types/profile.response.interface';
import { ProfileService } from './profile.service';
import { User } from './../user/user.entity';
import { UserDecorator } from './../user/decorator/user.decorator';
import { AuthGuard } from './../user/guards/auth.guard';
import { Param, UseGuards } from '@nestjs/common/decorators';
import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/api/profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  @ApiOperation({ summary: 'Get profile for user' })
  async getProfile(@UserDecorator() currentUser: User,@Param('username') username: string): Promise<ProfileResponse> {

    const profile = await this.profileService.getProfile(currentUser, username);
    return this.profileService.buildProfileResponse(profile);
  }

  @Post('/:username/follow')
  @ApiOperation({ summary: 'Follow User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async followUser(
    @UserDecorator() currentUser: User,
    @Param('username') username: string,
  ) {}

  @Delete('/:username/follow')
  @ApiOperation({ summary: 'Unfollow User' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async unfollowUser(
    @UserDecorator() currentUser: User,
    @Param('username') username: string,
  ) {}
}
