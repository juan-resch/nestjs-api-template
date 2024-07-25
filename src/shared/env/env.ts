import { z } from 'zod'

import { ENVIRONMENTS } from '../utils/constants'

export const envSchema = z.object({
  NODE_ENV: z.nativeEnum(ENVIRONMENTS),
  DATABASE_URL: z.string().url(),
  SENTRY_DSN: z.string().url(),
  JWT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>
