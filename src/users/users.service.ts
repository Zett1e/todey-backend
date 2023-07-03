import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { userDto } from './dtos/user.dto';

const prisma = new PrismaClient()

@Injectable()
export class UsersService {
    userLogin(dto: userDto) {
        return {
            dto
        }
    }

    async userSignup(dto: userDto) {
        try {
            const newUser = await prisma.users.create({
                data: dto
            })
            return newUser
        } catch (error) {
            throw new HttpException("User cannot be created",HttpStatus.BAD_REQUEST)            
        }
    }
}
