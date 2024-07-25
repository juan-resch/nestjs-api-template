import { Module } from '@nestjs/common'

import CreateUserUseCase from '../../application/use-cases/create/create-user.use-case'
import CreateUserController from '../controllers/create/create-user.controller'

import { DatabaseModule } from '@/shared/db/database.module'
import { EnvModule } from '@/shared/env/env.module'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [CreateUserUseCase],
  controllers: [CreateUserController],
})
export class UserModule {}
