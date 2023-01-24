import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty,IsEmail } from "class-validator";

export class CreateUserDTO{

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'email@email.pt', description: 'Your email'})
    email:string;

    @IsNotEmpty()
    @ApiProperty({ example: '4f9uf#$23f32', description: 'Strong password for your account' })
    password: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'MyUsername', description: 'You username'})
    username: string;
}