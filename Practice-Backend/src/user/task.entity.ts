import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity("task")
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "text" })
    description: string;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    assignedTo: UserEntity[];

    @ManyToOne(() => UserEntity, (user)=> user.tasks)
    createdBy: UserEntity;

    @Column({ type: "varchar", length: 20, default: "Not Started" })
    status: string;
}
