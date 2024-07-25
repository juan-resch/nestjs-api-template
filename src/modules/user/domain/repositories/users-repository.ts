import { User } from '../entities/user.entity'

import { Repository } from '@/@core/repository'

export abstract class UsersRepository extends Repository<User> {}
