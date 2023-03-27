import { EmailService } from './../mailer/email.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './guards/auth.guard';
import { Follow } from '../profile/follow.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard, EmailService],
  imports: [TypeOrmModule.forFeature([User, Follow])],
  exports:[UserService]
})

export class UserModule {}
