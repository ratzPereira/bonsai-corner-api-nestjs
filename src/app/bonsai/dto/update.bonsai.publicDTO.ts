import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateBonsaiPublicDTO {
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    isPublic:boolean
}