import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.findOne(req.user.id, +id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    return this.tasksService.update(req.user.id, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.remove(req.user.id, +id);
  }
}
