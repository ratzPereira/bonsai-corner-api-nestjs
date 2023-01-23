import { User } from './../user/user.entity';
import { CreateBonsaiDTO } from './dto/create.bonsaiDTO';
import { Bonsai } from './bonsai.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonsaiResponse } from './types/bonsai.response.interface';

@Injectable()
export class BonsaiService {
  constructor(
    @InjectRepository(Bonsai)
    private bonsaiRepository: Repository<Bonsai>,
  ) {}

  async getAll(): Promise<Bonsai[]> {
    return await this.bonsaiRepository.find();
  }

  async createBonsai(
    currentUser: User,
    createBonsaiDTO: CreateBonsaiDTO,
  ): Promise<Bonsai> {
    const bonsai = new Bonsai();

    Object.assign(bonsai, createBonsaiDTO);

    if (!bonsai.description) bonsai.description = '';
    if (!bonsai.images) bonsai.images = [];
    if (!bonsai.interventions) bonsai.interventions = [];

    bonsai.owner = currentUser;

    return await this.bonsaiRepository.save(bonsai);
  }

  async getBonsaiById(user: User, id: number) {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    if (!bonsai || bonsai.owner.id != user.id)
      throw new HttpException('Bonsai not found', HttpStatus.NOT_FOUND);

    return bonsai;
  }

  async deleteBonsaiById(user: User, id: number) {
    const bonsai = await this.bonsaiRepository.findOne({
      relations: ['owner'],
      where: { id },
    });

    if (!bonsai || bonsai.owner.id != user.id)
      throw new HttpException('Bonsai not found', HttpStatus.NOT_FOUND);

    return await this.bonsaiRepository.delete(id);
  }

  buildBonsaiResponse(bonsai: Bonsai): BonsaiResponse {
    return {
      bonsai,
    };
  }
}
