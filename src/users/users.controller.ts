import { Body, Controller, Post } from '@nestjs/common';
import { userDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('login')
    userLogin(@Body() dto: userDto ) {
        return this.usersService.userLogin(dto)
    }

    @Post('signup')
    userSignup( @Body() dto: userDto ) {
        return this.usersService.userSignup(dto)
    }

}
