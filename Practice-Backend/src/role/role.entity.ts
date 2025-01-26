import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity("role")
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    role: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];
}
