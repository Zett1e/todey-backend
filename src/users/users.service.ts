import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  userLogin(dto: userDto) {
    return {
      dto,
    };
  }

  async userSignup(dto: userDto) {
    try {
      const newUser = await this.prisma.users.create({
        data: dto,
      });
      return newUser;
    } catch (error) {
      throw new HttpException('User cannot be created', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUsers() {
    try {
      const user = await this.prisma.users.findMany({
        include: {
            todos: true
        }
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
