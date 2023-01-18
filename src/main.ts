import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

if(!process.env.IS_TS_NODE){
  require('module-alias/register')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
