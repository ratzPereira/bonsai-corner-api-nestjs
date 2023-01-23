import { User } from './../user/user.entity';
import { CreateBonsaiDTO } from './dto/create.bonsaiDTO';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { Bonsai } from './bonsai.entity';
import { BonsaiService } from './bonsai.service';
import { Controller, Get, Post } from '@nestjs/common';
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
  ) {
    return await this.bonsaiService.createBonsai(currentUser, createBonsaiDTO)
  }
}
