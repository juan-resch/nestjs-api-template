import { ConflictException, Injectable } from '@nestjs/common'

import CreateUserDTO from '../../dtos/create-user.dto'

import { Either, left, right } from '@/@core/either'
import { PublicUser, User } from '@/modules/user/domain/entities/user.entity'
import { UsersRepository } from '@/modules/user/domain/repositories/users-repository'

// Either<ErrorType1 | ErrorType2 ... , SuccessType>
type CreateUserUseCaseReponse = Either<ConflictException, PublicUser>

@Injectable()
export default class CreateUserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(params: CreateUserDTO): Promise<CreateUserUseCaseReponse> {
    const userWithSameEmail = await this.userRepository.findWith(
      'email',
      params.email
    )

    if (userWithSameEmail)
      return left(new ConflictException('User with same email already exists'))

    const user = User.create(params)

    await this.userRepository.create(user)

    return right(User.toString(user))
  }
}
