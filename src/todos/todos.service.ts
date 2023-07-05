import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(error,HttpStatus.BAD_REQUEST)
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
      throw new HttpException(error,HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: number) {
    try {
      const todo = await this.prisma.todos.findUnique({
        where: {
          id
        }
      })
      return todo;
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.prisma.todos.update({
        where : {
          id
        },
        data: updateTodoDto
      })
      return todo
    } catch (error) {
      
      throw new HttpException(error,HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
        await this.prisma.todos.delete({
          where: {
            id
          }
        })      
      return `Todo Deleted`;
    } catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST)

    }
  }
}
