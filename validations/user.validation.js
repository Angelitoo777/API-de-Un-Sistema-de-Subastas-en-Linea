import { z } from 'zod'

const validateUser = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  roles: z.array(
    z.number().int().positive().min(1).optional().default([1])
  )
})

export const validationUser = (data) => {
  return validateUser.safeParse(data)
}

export const validationParcialUser = (data) => {
  return validateUser.partial().safeParse(data)
}
