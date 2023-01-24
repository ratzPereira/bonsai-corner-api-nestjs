import { AuthMiddleware } from './app/user/middleware/auth.middleware';
import { BonsaiModule } from '@app/app/bonsai/bonsai.module';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { UserModule } from './app/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig.options),
    BonsaiModule,
    UserModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port:'587',
        auth: {
          user: process.env.EMAIL_USER || 'mybonsaicorner@gmail.com',
          pass: process.env.EMAIL_PASSWORD || 'rymwsrcymnbzxdcu',
        },
      },
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
