import { IsNotEmpty,IsEmail } from "class-validator";

export class CreateUserDTO{

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    username: string;
}