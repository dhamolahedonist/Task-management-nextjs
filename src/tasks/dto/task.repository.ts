import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./create-task.dto";
import { TaskStatus } from "../task-status.enum";
import { GetTasksFilterDto } from "./get-tasks-filter.dto";


@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {  

    // async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    //     const query =  this.createQueryBuilder('task') 

    //     const tasks = await query.getMany()
    //     return tasks
    // }
    // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    //     const { title, description } = createTaskDto;
    //     const task = this.create({
    //       title,
    //       description,
    //       status: TaskStatus.OPEN
    
    //     })
    
    //     await this.save(task)
    //     return task

    // }

}

// @EntityRepository(Task)
// export class TasksRepository extends Repository<Task> {
//   async findOneBy(condition: Partial<Task>): Promise<Task | undefined> {
//     return this.findOne({ where: condition });
//   }
// }

