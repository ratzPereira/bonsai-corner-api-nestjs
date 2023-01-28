import { BackendValidationPipe } from './../shared/pipes/backendValidation.pipe';
import { UpdateBonsaiPublicDTO } from './dto/update.bonsai.publicDTO';
import { UpdateBonsaiDTO } from './dto/update.bonsaiDTO';
import { BonsaiResponse } from './types/bonsai.response.interface';
import { User } from './../user/user.entity';
import { CreateBonsaiDTO } from './dto/create.bonsaiDTO';
import { Body, Param, Query, UseGuards } from '@nestjs/common/decorators';
import { Bonsai } from './bonsai.entity';
import { BonsaiService } from './bonsai.service';
import { Controller, Delete, Get, Post, Put, UsePipes } from '@nestjs/common';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserDecorator } from '../user/decorator/user.decorator';
import { BonsaisResponse } from './types/bonsais.response.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('bonsai')
@Controller('/api/bonsai')
export class BonsaiController {
  constructor(private bonsaiService: BonsaiService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user bonsais' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getAllBonsaiForUser(
    @UserDecorator() currentUser: User,
    @Query() query: any,
  ): Promise<BonsaisResponse> {
    return this.bonsaiService.getAll(currentUser, query);
  }

  @Get('/feed/custom')
  @ApiOperation({ summary: 'Get feed with custom query' })
  getAllBonsaiCustomFeed(
    @Query() query: any,
    @UserDecorator() currentUser: User,
  ): Promise<BonsaisResponse> {
    return this.bonsaiService.getFeedCustom(currentUser, query);
  }

  @Get('/feed')
  @ApiOperation({ summary: 'Get feed' })
  getAllBonsaiForFeed(): Promise<Bonsai[]> {
    return this.bonsaiService.getFeed();
  }

  @Get('/feed/followers')
  @ApiOperation({ summary: 'Get feed from your followed users' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getAllBonsaiForFollowersFeed(
    @Query() query: any,
    @UserDecorator() currentUser: User,
  ) {
    return this.bonsaiService.getFollowersFeed(query, currentUser);
  }

  @Put('/public/:id')
  @ApiOperation({ summary: 'Update if bonsai is public or private' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateIsPublicBonsai(
    @UserDecorator() currentUser: User,
    @Body() updateBonsaiPublicDTO: UpdateBonsaiPublicDTO,
    @Param('id') id: number,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.updateBonsaiPublic(
      currentUser,
      updateBonsaiPublicDTO,
      id,
    );
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }

  @Post()
  @ApiOperation({ summary: 'Create new bonsai' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async createBonsai(
    @UserDecorator() currentUser: User,
    @Body() createBonsaiDTO: CreateBonsaiDTO,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.createBonsai(
      currentUser,
      createBonsaiDTO,
    );
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get bonsai by ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getBonsaiById(
    @UserDecorator() currentUser: User,
    @Param('id') id: number,
  ) {
    const bonsai = await this.bonsaiService.getBonsaiById(currentUser, id);
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete bonsai by ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteBonsaiById(
    @UserDecorator() currentUser: User,
    @Param('id') id: number,
  ) {
    return this.bonsaiService.deleteBonsaiById(currentUser, id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update bonsai by ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateBonsaiById(
    @UserDecorator() currentUser: User,
    @Body() updateBonsaiDTO: UpdateBonsaiDTO,
    @Param('id') id: number,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.updateBonsai(
      currentUser,
      updateBonsaiDTO,
      id,
    );
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }

  @Post('/:id/favorite')
  @ApiOperation({ summary: 'Set bonsai as favorite' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async setFavorite(
    @UserDecorator() currentUser: User,
    @Param('id') id: number,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.addBonsaiToFavorite(
      currentUser,
      id,
    );
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }

  @Delete('/:id/favorite')
  @ApiOperation({ summary: 'Remove bonsai from favorite' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async removeFavorite(
    @UserDecorator() currentUser: User,
    @Param('id') id: number,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.removeBonsaiToFavorite(
      currentUser,
      id,
    );
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }
}
