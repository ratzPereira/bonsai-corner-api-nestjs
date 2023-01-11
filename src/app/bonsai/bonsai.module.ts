import { BonsaiController } from './controllers/bonsai.controller';
import { BonsaiService } from './services/bonsai.service';
import { Module } from '@nestjs/common';


@Module({
  providers: [BonsaiService],
  controllers:[BonsaiController]
})
export class BonsaiModule {}