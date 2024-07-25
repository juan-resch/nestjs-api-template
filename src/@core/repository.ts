import { PaginationResponse } from './pagination/pagination'

export abstract class Repository<T, WhereInput = undefined> {
  abstract create(item: T): Promise<void>
  abstract update(item: T): Promise<void>
  abstract findMany(
    page: number,
    pageSize: number,
    where?: WhereInput,
    filterBy?: string
  ): Promise<PaginationResponse<T>>
  abstract findOne(id: string): Promise<T | null>
  abstract delete(item: T): Promise<void>
  abstract findWith(key: keyof T, value: string): Promise<T | null>
}
