import { AggregateRoot } from '@/@core/entities/aggregate-root'
import { UUID } from '@/@core/entities/uuid.entity'
import { Optional } from '@/@core/types/optional'
import { WithId } from '@/@core/types/with-id'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date | null
}

export type PublicUser = Omit<UserProps, 'password'>

export class User extends AggregateRoot<UserProps> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(value: string) {
    this.props.email = value
    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(value: string) {
    this.props.password = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(value: Date) {
    this.props.createdAt = value
    this.touch()
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static toString(user: User): WithId<PublicUser> {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static create(props: Optional<UserProps, null>, id?: UUID) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return user
  }
}
