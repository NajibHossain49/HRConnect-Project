import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateRoleDTO {
    @IsNotEmpty({ message: 'Role is required' })
    @IsString({ message: 'Role must be a string' })
    @MaxLength(50, { message: 'Role must not exceed 50 characters' })
    role: string;
}
