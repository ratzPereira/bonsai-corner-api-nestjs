import { BonsaiModule } from '@app/app/bonsai/bonsai.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig'
import { UserModule } from '@app/app/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options), BonsaiModule, UserModule],
})
export class AppModule {}
