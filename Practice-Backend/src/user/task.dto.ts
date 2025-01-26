import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString, IsDate, IsArray } from "class-validator";

export class TaskDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsArray()
    assignedTo: number[];
}

export class UpdateTaskStatusDTO{
    @Optional()
    status: string;
}