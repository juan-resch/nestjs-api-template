import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaUsersRepository } from './repositories/prisma-user-repository'

import { UsersRepository } from '@/modules/user/domain/repositories/users-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, UsersRepository],
})
// skipcq: JS-0327
export class DatabaseModule {}
