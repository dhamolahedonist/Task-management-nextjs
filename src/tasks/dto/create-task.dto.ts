// eslint-disable-next-line prettier/prettier
/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

