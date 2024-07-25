import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBody,
  ApiConflictResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'

import CreateUserDTO from '@/modules/user/application/dtos/create-user.dto'
import CreateUserUseCase from '@/modules/user/application/use-cases/create/create-user.use-case'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

const validationPipe = new ZodValidationPipe(bodySchema)

@ApiTags('Users')
@Controller('/users')
export default class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful',
    type: null,
  })
  @ApiConflictResponse({
    description: 'Conflict',
    type: null,
  })
  @ApiBody({ type: CreateUserDTO })
  async handle(@Body(validationPipe) body: CreateUserDTO) {
    const { isLeft, value } = await this.createUserUseCase.execute(body)

    if (isLeft()) throw value

    return value
  }
}
