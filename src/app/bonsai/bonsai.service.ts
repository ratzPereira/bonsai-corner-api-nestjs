import { BonsaiEntity } from './bonsai.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BonsaiService {
  constructor(
    @InjectRepository(BonsaiEntity)
    private bonsaiRepository: Repository<BonsaiEntity>,
  ) {}

  async getAll(): Promise<BonsaiEntity[]> {
    return await this.bonsaiRepository.find();
  }
}
