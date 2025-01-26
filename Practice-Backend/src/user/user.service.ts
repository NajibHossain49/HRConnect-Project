import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { JwtService } from "@nestjs/jwt";
import { loginDTO, UpdateDTO } from "./user.dto";
import { TaskDTO, UpdateTaskStatusDTO } from "./task.dto";
import { TaskEntity } from "./task.entity";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,

    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,
    ) { }

    async getUsersByusername(username: string): Promise<UserEntity> {
        return await this.userRepo.findOne({
            where: {
                username: username,
            },
            relations: ['role']
        });
    }

    async addUser(myobj: UserEntity): Promise<UserEntity> {
        
        return await this.userRepo.save(myobj);
    }
    async findOne(logindata: loginDTO): Promise<any> {
        // return await this.userRepo.findOneBy({ username: logindata.username });
        const query = this.userRepo.findOne({where: {username: logindata.username }, relations: ['role']});

        return query;
    }

    async getStaffs(): Promise<UserEntity[]> {
        return await this.userRepo.find({
            relations: ['role'], // Include the role relationship
        });
    }

    async searchStaff(name: string): Promise<UserEntity[]> {
        return await this.userRepo.find({
            where: {
                name: Like(name + '%')
            },
        });
    }

    async showProfile(username: string): Promise<UserEntity> {
        return await this.userRepo.findOne({where: { username }, relations: ['role']});
    }
    
    async updateProfile(username: string, UpdateInfo: UpdateDTO): Promise<any> {
        await this.userRepo.update({ username: username }, UpdateInfo);
        return await this.userRepo.findOneBy({ username: username });
    }

    async deleteUserById(id: number): Promise<any> {
        const user = await this.userRepo.findOne({ where: { userid: id } });
        if (!user) {
            return { success: false, message: `User with ID ${id} not found.` };
        }
        await this.userRepo.remove(user);
        return { success: true, message: `User with ID ${id} deleted successfully.` };
    }

    async asigntask(taskinfo: TaskDTO, creator: any): Promise<any>{
        const { title, description, assignedTo } = taskinfo;

        const creatorinfo = await this.userRepo.findOneBy({username: creator});
        console.log(creatorinfo)
        const assignees = await this.userRepo.find({where: {userid: In(assignedTo),},}); 

        const task = this.taskRepo.create({
            title,
            description,
            assignedTo: assignees,
            createdBy: creatorinfo,
        });
        return await this.taskRepo.save(task);
    }

    async deleteTask(id: number, username: string): Promise<any> {
        try {
          // Find the task by ID and creator
          const task = await this.taskRepo.findOne({ where: { id }, relations: ['createdBy'], });
    
          if (!task) {
            return false; // Task not found or unauthorized access
          }
    
          // Delete the task
          await this.taskRepo.remove(task); // Remove the task entity
          return true; // Task successfully deleted
        } catch (error) {
          console.error('Error deleting task:', error);
          throw new HttpException('Failed to delete task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    async deleteTaskbyId(id: string): Promise<boolean> {
        try {
          const deleteResult = await this.taskRepo.delete(id);
          return deleteResult.affected > 0;
        } catch (error) {
          console.error('Error deleting task:', error);
          throw new Error('Failed to delete task');
        }
    }

    async getAllTasks(creator: string): Promise<TaskEntity[]> {
        return this.taskRepo.find({
            where: { createdBy: { username: creator } },
            relations: ["createdBy", "assignedTo"], // Include related entities
        });
    }

    async updateStutus(id: number, UpdateTaskStatusDTO: UpdateTaskStatusDTO): Promise<any>{
        await this.taskRepo.update({ id: id }, UpdateTaskStatusDTO);
        return await this.taskRepo.findOneBy({ id: id });
    }
}