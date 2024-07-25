import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { Request } from '@/@core/types/request-with-user-id'
import { UsersRepository } from '@/modules/user/domain/repositories/users-repository'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UsersRepository
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request

    const token = request.headers.authorization?.split(' ')[1]

    if (!token) throw new UnauthorizedException('Invalid JWT')

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env['JWT_SECRET'],
      })

      const user = await this.userRepository.findOne(decoded?.id)

      if (!user) throw new UnauthorizedException('Invalid JWT')

      request.user = {
        id: user.id,
      }

      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT')
      // console.error(err)
    }
  }
}
