import { TypeOrmModule } from '@nestjs/typeorm';
import { BonsaiController } from './bonsai.controller';
import { BonsaiService } from './bonsai.service';
import { Module } from '@nestjs/common';
import { BonsaiEntity } from './bonsai.entity';


@Module({
  providers: [BonsaiService],
  controllers:[BonsaiController],
  imports: [TypeOrmModule.forFeature([BonsaiEntity])],
})
export class BonsaiModule {}