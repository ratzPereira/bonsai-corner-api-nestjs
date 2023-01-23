import { UpdateBonsaiDTO } from './dto/update.bonsaiDTO';
import { BonsaiResponse } from './types/bonsai.response.interface';
import { User } from './../user/user.entity';
import { CreateBonsaiDTO } from './dto/create.bonsaiDTO';
import { Body, Param, UseGuards } from '@nestjs/common/decorators';
import { Bonsai } from './bonsai.entity';
import { BonsaiService } from './bonsai.service';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserDecorator } from '../user/decorator/user.decorator';

@Controller('/api/bonsai')
export class BonsaiController {
  constructor(private bonsaiService: BonsaiService) {}

  @Get()
  getAllBonsai(): Promise<Bonsai[]> {
    return this.bonsaiService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
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
  async updateBonsaiById(
    @UserDecorator() currentUser: User,
    @Body('bonsai') updateBonsaiDTO: UpdateBonsaiDTO,
    @Param('id') id: number,
  ): Promise<BonsaiResponse> {
    const bonsai = await this.bonsaiService.updateBonsai(currentUser, updateBonsaiDTO, id);
    return this.bonsaiService.buildBonsaiResponse(bonsai);
  }
}
