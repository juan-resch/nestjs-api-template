import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaUserMapper } from 'test/mappers/user-mapper'

import { PrismaService } from '../prisma/prisma.service'

import { DomainEvents } from '@/@core/events/domain-events'
import { PaginationResponse } from '@/@core/pagination/pagination'
import { User } from '@/modules/user/domain/entities/user.entity'
import { UsersRepository } from '@/modules/user/domain/repositories/users-repository'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(item: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(item)

    await this.prisma.user.create({
      data,
    })

    DomainEvents.dispatchEventsForAggregate(item.id)
  }

  async update(item: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(item)

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })

    DomainEvents.dispatchEventsForAggregate(item.id)
  }

  async findMany(
    page: number,
    pageSize: number,
    where?: Prisma.UserWhereInput
  ): Promise<PaginationResponse<User>> {
    const skip = (page - 1) * pageSize
    const [companies, totalRecords] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        where,
      }),
      this.prisma.user.count(),
    ])

    const domainUsers = companies.map(PrismaUserMapper.toDomain)

    return {
      data: domainUsers,
      totalRecords,
      page,
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async delete(item: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(item)

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findWith(key: keyof User, value: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        [key]: value,
      },
    })

    return user ? PrismaUserMapper.toDomain(user) : null
  }

  async findLast(): Promise<User> {
    const companies = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (companies.length <= 0) return null

    return PrismaUserMapper.toDomain(companies[0])
  }
}
