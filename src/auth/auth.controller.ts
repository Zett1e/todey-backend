import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, signupDto } from './dto/auth.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}
    @Post('login')
    userLogin(@Body() dto: loginDto ) {
        return this.authService.userLogin(dto)
    }

    @Post('signup')
    userSignup( @Body() dto: signupDto ) {
        return this.authService.userSignup(dto)
    }
  
}
