import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants'; // Adjust the path as needed
  import { Request } from 'express';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // Get the required roles from metadata
      const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) {
        return true; // If no roles are specified, allow access
      }
  
      // Get the request object and extract the token
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
  
      try {
        // Verify the token and extract the payload
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
  
        // Attach the payload to the request for further use
        request['user'] = payload;
        // console.log('Extracted user from token:', payload);
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
  
      // Check if the user's roles match any of the required roles
      const user = request['user'];
  
      if (!user || !user.roles) {
        throw new ForbiddenException('User roles not found');
      }
  
      const hasRole = requiredRoles.some((role) => user.roles.includes(role));
  
      if (!hasRole) {
        throw new ForbiddenException('You do not have the required role');
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  