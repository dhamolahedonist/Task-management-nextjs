/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
import { TaskStatus } from "../task-status.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
