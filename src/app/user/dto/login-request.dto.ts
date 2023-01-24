import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginResquestDTO{

   
    @IsEmail()
    @ApiProperty({ example: 'email@email.pt', description: 'Your email'})
    email:string

    
    @IsNotEmpty()
    @ApiProperty({ example: '4f9uf#$23f32', description: 'Strong password for your account' })
    password: string
}