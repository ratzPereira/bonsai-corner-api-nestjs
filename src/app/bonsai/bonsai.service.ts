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
}
