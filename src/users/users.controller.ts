import { Body, Controller, Post,Get } from '@nestjs/common';
import { userDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

}
