import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum/role.enum";
import { User } from "../entities/user.entity";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRole = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])

        if (!requiredRole) {

            return true

        }

        // const { user } = context.switchToHttp().getRequest()

        const user: User = {

            name: 'nhat tan',
            roles: [Role.ADMIN]

        }

        return requiredRole.some((role) => user.roles?.includes(role))
    }

}