import { Follow } from './../profile/follow.entity';
import { User } from './../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonsaiController } from './bonsai.controller';
import { BonsaiService } from './bonsai.service';
import { Module } from '@nestjs/common';
import { Bonsai } from './bonsai.entity';

@Module({
  providers: [BonsaiService],
  controllers: [BonsaiController],
  imports: [TypeOrmModule.forFeature([Bonsai, User, Follow])],
})
export class BonsaiModule {}
