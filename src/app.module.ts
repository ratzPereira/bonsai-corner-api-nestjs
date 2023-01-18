import { BonsaiModule } from '@app/bonsai/bonsai.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig'

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options), BonsaiModule],
})
export class AppModule {}
