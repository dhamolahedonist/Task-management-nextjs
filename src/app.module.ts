/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from "@nestjs/common";
import { TasksController } from "./tasks/tasks.controller";
import TasksService from "./tasks/tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { Task } from './tasks/task.model';
import { TasksModule } from "./tasks/task.modules";

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true
    })
  ]
})
export class AppModule {}
