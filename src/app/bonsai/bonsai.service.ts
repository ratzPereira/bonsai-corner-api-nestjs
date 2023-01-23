import { User } from './../user/user.entity';
import { CreateBonsaiDTO } from './dto/create.bonsaiDTO';
import { Bonsai } from './bonsai.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
