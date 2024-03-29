import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import TasksService from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksRepository } from "./dto/task.repository";
import { Task } from "./dto/task.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Task, TasksRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
    // imports: [
    //     TypeOrmModule.forFeature([TasksRepository])
    // ],
    // controllers: [TasksController],
    // providers: [TasksService]
// })

export class TasksModule {}