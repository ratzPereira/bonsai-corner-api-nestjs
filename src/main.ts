import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Bonsai Corner')
    .setDescription('Bonsai Social media')
    .setVersion('1.0')
    .addTag('#bonsai')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
bootstrap();
