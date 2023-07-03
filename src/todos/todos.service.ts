import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

const prisma = new PrismaClient()

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = await prisma.todos.create({
        data: createTodoDto
      })
      return todo;
    } catch (error) {
      throw new HttpException("Todo can't be created",HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    try {
      const todo = await prisma.todos.findMany()
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
