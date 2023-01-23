import { UpdateBonsaiPublicDTO } from './dto/update.bonsai.publicDTO';
import { UpdateBonsaiDTO } from './dto/update.bonsaiDTO';
import { BonsaiResponse } from './types/bonsai.response.interface';
import { User } from './../user/user.entity';
import { CreateBonsaiDTO } from './dto/create.bonsaiDTO';
import { Body, Param, Query, UseGuards } from '@nestjs/common/decorators';
import { Bonsai } from './bonsai.entity';
import { BonsaiService } from './bonsai.service';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserDecorator } from '../user/decorator/user.decorator';
import { BonsaisResponse } from './types/bonsais.response.interface';

@Controller('/api/bonsai')
export class BonsaiController {
  constructor(private bonsaiService: BonsaiService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllBonsaiForUser(
    @UserDecorator() currentUser: User,
    @Query() query: any,
  ): Promise<BonsaisResponse> {
    return this.bonsaiService.getAll(currentUser, query);
  }

  @Get('/feed/custom')
  getAllBonsaiCustomFeed(@Query() query: any): Promise<BonsaisResponse> {
    return this.bonsaiService.getFeedCustom(query);
  }

  @Get('/feed')
  getAllBonsaiForFeed(): Promise<Bonsai[]> {
    return this.bonsaiService.getFeed();
  }

  @Put('/public/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
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
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createBonsai(
    @UserDecorator() currentUser: User,
    @Body('bonsai') createBonsaiDTO: CreateBonsaiDTO,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.createBonsai(
      currentUser,
      createBonsaiDTO,
    );
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getBonsaiById(
    @UserDecorator() currentUser: User,
    @Param('id') id: number,
  ) {
    const bonsai = await this.bonsaiService.getBonsaiById(currentUser, id);
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteBonsaiById(
    @UserDecorator() currentUser: User,
    @Param('id') id: number,
  ) {
    return this.bonsaiService.deleteBonsaiById(currentUser, id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateBonsaiById(
    @UserDecorator() currentUser: User,
    @Body('bonsai') updateBonsaiDTO: UpdateBonsaiDTO,
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
  @UseGuards(AuthGuard)
  async setFavorite(
    @UserDecorator() currentUser: User,
    @Param('id') id: number,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.addBonsaiToFavorite(currentUser, id);
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }
}
