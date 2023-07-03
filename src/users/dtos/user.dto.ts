import { IsEmail, IsNotEmpty } from "class-validator";

export class userDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
}