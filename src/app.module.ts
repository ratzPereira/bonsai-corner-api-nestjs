import { BonsaiModule } from './app/bonsai/bonsai.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BonsaiModule],
})
export class AppModule {}
