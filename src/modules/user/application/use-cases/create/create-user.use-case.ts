import { Injectable } from '@nestjs/common'

import CreateUserDTO from '../../dtos/create-user.dto'

import { Either, right } from '@/@core/either'
import { PublicUser, User } from '@/modules/user/domain/entities/user.entity'
import { UsersRepository } from '@/modules/user/domain/repositories/users-repository'

// Either<ErrorType1 | ErrorType2 ... , SuccessType>
type CreateUserUseCaseReponse = Either<null, PublicUser>

@Injectable()
export default class CreateUserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(params: CreateUserDTO): Promise<CreateUserUseCaseReponse> {
    const user = User.create(params)

    await this.userRepository.create(user)

    return right(User.toString(user))
  }
}
