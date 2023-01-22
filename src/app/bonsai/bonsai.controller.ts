import { Bonsai } from './bonsai.entity';
import { BonsaiService } from './bonsai.service';
import { Controller, Get , Post} from '@nestjs/common';

@Controller('/api/bonsai')
export class BonsaiController {
  constructor(private bonsaiService: BonsaiService) {}

  @Get()
  getAllBonsai(): Promise<Bonsai[]> {
    return this.bonsaiService.getAll();
  }

  @Post()
  createBonsai(){

  }
}
