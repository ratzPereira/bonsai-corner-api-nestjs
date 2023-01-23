import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateBonsaiPublicDTO {
    @IsNotEmpty()
    @IsBoolean()
    isPublic:boolean
}