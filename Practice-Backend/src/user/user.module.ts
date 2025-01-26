import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { UserEntity } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "src/auth/auth.service";
import { AuthModule } from "src/auth/auth.module";
import { TaskEntity } from "./task.entity";


@Module({
    imports: [ TypeOrmModule.forFeature([UserEntity, TaskEntity]),
    JwtModule.register({
        global: true,
        secret: "3NP_Backend_Practice",
        signOptions: { expiresIn: '30m' },
    }),forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
