import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { loginDto, signupDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';

type JwtPayload = {
    id: number,
    email: string
}

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async userLogin(dto: loginDto) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email: dto.email
                }
            })

            if(!user) {
                throw new HttpException('Invalid Email or Password', HttpStatus.UNAUTHORIZED);

            }

            const userMatch = await argon.verify(user.password, dto.password)

            if(!userMatch) {
                throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);

            }

            const accessToken = this.getToken({id: user.id,email: user.email})

            return {email: user.email,accessToken};

        } catch (error) {
            throw new HttpException(error, HttpStatus.UNAUTHORIZED);

        }
      }
    
      async userSignup(dto: signupDto) {
        const hash = await argon.hash(dto.password)
        try {
          const newUser = await this.prisma.users.create({
            data: {
                ...dto,
                password: hash
            },
          });
          return newUser;
        } catch (error) {
          throw new HttpException('User cannot be created', HttpStatus.BAD_REQUEST);
        }
      }

      private async getToken(
        payload: JwtPayload,
      ) {
        const token = this.jwt.sign(payload,{ secret: 'todey secret' });
        return token;
      }
      
}

