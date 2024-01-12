/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import TasksService from "./tasks.service";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./dto/task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { Logger } from "@nestjs/common";

@Controller("tasks")
@UseGuards(AuthGuard())
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TasksController {
  private logger = new Logger('TaskController')
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @GetUser() user: User,
    @Query() filterDto: GetTasksFilterDto
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get("/:id")
  getTaskById(

    @Param("id") id: string, @GetUser() user: User ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new tasks. Data: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string,   @GetUser() user: User,): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatus: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
