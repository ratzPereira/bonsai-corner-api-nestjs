import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginResquestDTO{

    @IsEmail()
    email:string

    @IsNotEmpty()
    password: string
}