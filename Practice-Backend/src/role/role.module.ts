import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { UserModule } from "src/user/user.module";


@Module({
    imports: [UserModule, TypeOrmModule.forFeature([RoleEntity])],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService],
})
export class RoleModule {}