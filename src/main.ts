import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

// if(!process.env.IS_TS_NODE){
//   require('module-alias/register')
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.PORT)
  console.log(process.env.MYPORT)
  await app.listen(process.env.MYPORT || 4000);
}
bootstrap();
