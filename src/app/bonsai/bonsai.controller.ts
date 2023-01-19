import { BonsaiEntity } from './bonsai.entity';
import { BonsaiService } from './bonsai.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/api/bonsai')
export class BonsaiController {
  constructor(private bonsaiService: BonsaiService) {}

  @Get()
  getAllBonsai(): Promise<BonsaiEntity[]> {
    return this.bonsaiService.getAll();
  }
}
