// skipcq: JS-0257
import type { Request as EXRequest } from 'express'

import { UUID } from '../entities/uuid.entity'

export interface Request extends EXRequest {
  user: {
    id: UUID
  }
}
