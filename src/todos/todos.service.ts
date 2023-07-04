import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Injectable()
export class TodosService {

  constructor(private prisma: PrismaService){}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = await this.prisma.todos.create({
        data: createTodoDto
      })
      return todo;
    } catch (error) {
      // throw new HttpException(error,HttpStatus.BAD_REQUEST)
      return {
        error
      }
    }
  }

  async findAll() {
    try {
      const todo = await this.prisma.todos.findMany({
        include: {
          user: true
        }
      })
      return todo;
    } catch (error) {
      throw new HttpException("Todo can't be created",HttpStatus.BAD_REQUEST)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
