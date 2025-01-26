import { Injectable, UnauthorizedException } from "@nestjs/common";
import { loginDTO, UserDTO } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RoleService } from "src/role/role.service";
import { CreateRoleDTO } from "src/role/role.dto";

@Injectable({})
export class AuthService {
    constructor(
        private userservice: UserService,
        private jwtService: JwtService
    ) { }
    async signup(user: UserDTO): Promise<UserDTO> {
        return await this.userservice.addUser(user);
    }

    async signin(logindata: loginDTO): Promise<{ access_token: string }>{
        const user = await this.userservice.findOne(logindata);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(logindata.password, user.password);
        
        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const payload = {
            username: user.username,
            roles: user.role.role,
          };
        
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}