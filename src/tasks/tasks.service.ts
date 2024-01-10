/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TasksRepository } from "./dto/task.repository";
import { Task } from "./dto/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";

@Injectable()
export default class TasksService {
  constructor(
      @InjectRepository(Task)
      private tasksRepository: TasksRepository,
  ) {};

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({where:{id}})

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found

  }


  // createTask(createTaskDto: CreateTaskDto): Promise<Task> {

  //   return this.tasksRepository.createTask(createTaskDto)
  // }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({id})
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    } 
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }


  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      const { title, description } = createTaskDto;
      const task = this.tasksRepository.create({
        title,
        description,
        status: TaskStatus.OPEN
  
      })
  
      await this.tasksRepository.save(task)
      return task

  //  return this.tasksRepository.createTask(createTaskDto)
  }

   async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
  
      task.status = status;
    

    await this.tasksRepository.save(task);

    return task;
  }


  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // getTaskById(id: string): Task {
  //   const foundTask = this.tasks.find((task) => task.id === id);

  //   if (!foundTask) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return foundTask;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }
 
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id)
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
