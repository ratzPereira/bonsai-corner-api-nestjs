import { AuthMiddleware } from './app/user/middleware/auth.middleware';
import { BonsaiModule } from '@app/app/bonsai/bonsai.module';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig.options), BonsaiModule, UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
