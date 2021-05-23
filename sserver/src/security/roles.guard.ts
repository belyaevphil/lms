import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Session } from 'express-session'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const session: Session = request.session

    if (!session.userData) {
      throw new UnauthorizedException('Требуется аутентификация')
    }

    if (roles.every(role => session.userData.roles.includes(role))) {
      return true
    } else {
      throw new ForbiddenException('Недостаточно прав')
    }
  }
}
