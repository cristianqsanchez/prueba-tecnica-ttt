import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return await this.prismaService.task.create({
      data: { userId, ...createTaskDto },
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.task.findMany({ where: { userId } });
  }

  async findOne(userId: number, id: number) {
    const taskFound = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!taskFound) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (taskFound.userId !== userId) {
      throw new ForbiddenException(`Access to task with id ${id} denied`);
    }

    return taskFound;
  }

  async update(userId: number, id: number, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });

    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (updatedTask.userId !== userId) {
      throw new ForbiddenException(`Task with ${id} cannot be modified`);
    }

    return updatedTask;
  }

  async remove(userId: number, id: number) {
    const removedTask = await this.prismaService.task.delete({
      where: { id },
    });

    if (!removedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (removedTask.userId !== userId) {
      throw new ForbiddenException(`Task with ${id} cannot be removed`);
    }

    return removedTask;
  }
}
