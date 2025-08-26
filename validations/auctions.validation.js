import { z } from 'zod'

const validateAuction = z.object({
  product_id: z.uuid(),
  startingPrice: z.number(),
  status: z.enum(['Abierta', 'Cerrada', 'Finalizada']).default('Abierta'),
  endTime: z.string().pipe(z.coerce.date())
})

const validateBid = z.object({
  amount: z.number(),
  auctions_id: z.uuid()
})

export const validationBid = (data) => {
  return validateBid.safeParse(data)
}

export const validationAuction = (data) => {
  return validateAuction.safeParse(data)
}
