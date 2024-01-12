/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TasksRepository } from "./dto/task.repository";
import { Task } from "./dto/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { User } from "src/auth/user.entity";
import { Logger } from "@nestjs/common";

@Injectable()
export default class TasksService {
  private logger = new Logger("TaskService", true)
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder("task");
    query.where({ user });

    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere(
        "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
        { search: `%${search}%` }
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`, error.stack
      );
      throw new InternalServerErrorException();
    }

    // return this.tasksRepository.getTasks(filterDto)
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.tasksRepository.save(task);
    return task;

    //  return this.tasksRepository.createTask(createTaskDto)
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }
}
