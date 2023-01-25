import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Module } from "@nestjs/common/decorators";
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers:[ProfileService],
    controllers:[ProfileController],
    imports: [TypeOrmModule.forFeature([User])],
})



export class ProfileModule{}