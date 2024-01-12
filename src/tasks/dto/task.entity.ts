import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../task-status.enum";
import { IsString } from "class-validator";
import { User } from "src/auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string


    @Column()
    @IsString()
    title: string

    @Column()
    @IsString()
    description: string

    @Column()
    status: TaskStatus

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false})
    @Exclude({ toPlainOnly: true })
    user: User


}