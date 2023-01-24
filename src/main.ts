import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

if(!process.env.IS_TS_NODE){
  require('module-alias/register')
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
