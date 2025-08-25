import { z } from 'zod'

const validateProduct = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(10)
})

export const validationProduct = (data) => {
  return validateProduct.safeParse(data)
}
