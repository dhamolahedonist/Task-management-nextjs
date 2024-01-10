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
} from "@nestjs/common";
import TasksService from "./tasks.service";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./dto/task.entity";

@Controller("tasks")
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TasksController {
  constructor(
    private tasksService: TasksService) {}

    @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    console.log(createTaskDto)
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

   @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatus: UpdateTaskStatusDto
  ): Promise<Task> {

    const { status } = updateTaskStatus
    return this.tasksService.updateTaskStatus(id, status);
  }


  

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }
  // @Get("/:id")
  // getTaskById(@Param("id") id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   @Body() createTaskDto: CreateTaskDto
  // ): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }
  // @Delete("/:id")
  // deleteTaskById(@Param("id") id: string): void {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Patch("/:id/status")
  // updateTaskStatus(
  //   @Param("id") id: string,
  //   @Body() updateTaskStatus: UpdateTaskStatusDto
  // ): Task {

  //   const { status } = updateTaskStatus
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
